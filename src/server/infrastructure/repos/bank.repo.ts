import type { IBankRepo } from "@/server/interfaces/infrastructure/repos/bank.repo.interface";
import type { BankTransaction } from "../models/bank-transaction.model";
import type { BankAccount } from "../models/bank-account.model";
import { db } from "@/db";
import { bankAccountsTable, bankTransactionsTable } from "@/db/schema/schema";
import { and, desc, eq, or, sql } from "drizzle-orm";
import { RepoSelectNotFoundError } from "./error";

export default class BankRepo implements IBankRepo {
  async findBankAccounts(): Promise<BankAccount[]> {
    return db.select().from(bankAccountsTable);
  }

  async findBankTransactionsByMonth(date: Date): Promise<BankTransaction[]> {
    const timezoneOffset = -new Date().getTimezoneOffset();
    return db
      .select()
      .from(bankTransactionsTable)
      .where(
        and(
          eq(
            sql`DATE_PART('month',${bankTransactionsTable.submittedAt} + (${timezoneOffset} * INTERVAL '1 minute'))`,
            date.getMonth() + 1,
          ),
          eq(
            sql`DATE_PART('year',${bankTransactionsTable.submittedAt} + (${timezoneOffset} * INTERVAL '1 minute'))`,
            date.getFullYear(),
          ),
        ),
      )
      .orderBy(desc(bankTransactionsTable.submittedAt));
  }

  async createDepositTransaction(
    data: Omit<BankTransaction, "id" | "type" | "exchangeRate" | "accountId2">,
  ): Promise<BankTransaction> {
    return db.transaction(async (tx) => {
      const accounts = await tx
        .select()
        .from(bankAccountsTable)
        .where(eq(bankAccountsTable.id, data.accountId1));
      if (accounts.length === 0) {
        throw new RepoSelectNotFoundError(bankAccountsTable, {
          id: data.accountId1,
        });
      }

      const account = accounts[0];
      if (account.isUSD) {
        throw new Error("cannot deposit to USD account");
      }

      await tx
        .update(bankAccountsTable)
        .set({ balance: `${bankAccountsTable.balance} + ${data.amount}` })
        .where(eq(bankAccountsTable.id, data.accountId1));

      return tx
        .insert(bankTransactionsTable)
        .values({ ...data, type: "DEPOSIT" })
        .returning()
        .then((results) => results[0]);
    });
  }

  async createWithdrawTransaction(
    data: Omit<BankTransaction, "id" | "type" | "exchangeRate" | "accountId2">,
  ): Promise<BankTransaction> {
    return db.transaction(async (tx) => {
      const accounts = await tx
        .select()
        .from(bankAccountsTable)
        .where(eq(bankAccountsTable.id, data.accountId1));
      if (accounts.length === 0) {
        throw new RepoSelectNotFoundError(bankAccountsTable, {
          id: data.accountId1,
        });
      }

      const account = accounts[0];
      if (account.isUSD) {
        throw new Error("cannot withdraw from USD account");
      }
      if (Number(account.balance) - Number(data.amount) < 0) {
        throw new Error("insufficient balance");
      }

      await tx
        .update(bankAccountsTable)
        .set({ balance: `${bankAccountsTable.balance} - ${data.amount}` })
        .where(eq(bankAccountsTable.id, data.accountId1));

      return tx
        .insert(bankTransactionsTable)
        .values({ ...data, type: "WITHDRAW" })
        .returning()
        .then((results) => results[0]);
    });
  }

  async createTransferTransaction(
    data: Omit<BankTransaction, "id" | "type" | "exchangeRate">,
  ): Promise<BankTransaction> {
    return db.transaction(async (tx) => {
      if (!data.accountId2) {
        throw new Error("accountId2 is null for TRANSFER_OUT transaction");
      }

      const accounts = await tx
        .select()
        .from(bankAccountsTable)
        .where(
          or(
            eq(bankAccountsTable.id, data.accountId1),
            eq(bankAccountsTable.id, data.accountId2),
          ),
        );
      if (accounts.length != 2) {
        throw new RepoSelectNotFoundError(bankAccountsTable, {
          id1: data.accountId1,
          id2: data.accountId2,
        });
      }

      const [accountFrom, accountTo] = accounts;
      if (
        (accountFrom.isUSD && !accountTo.isUSD) ||
        (!accountFrom.isUSD && accountTo.isUSD)
      ) {
        throw new Error(
          "cannot transfer from or to different currency account",
        );
      }
      if (Number(accountFrom.balance) - Number(data.amount) < 0) {
        throw new Error("insufficient balance");
      }

      await tx
        .update(bankAccountsTable)
        .set({ balance: `${bankAccountsTable.balance} - ${data.amount}` })
        .where(eq(bankAccountsTable.id, data.accountId1));
      await tx
        .update(bankAccountsTable)
        .set({ balance: `${bankAccountsTable.balance} + ${data.amount}` })
        .where(eq(bankAccountsTable.id, data.accountId2));

      return tx
        .insert(bankTransactionsTable)
        .values({ ...data, type: "TRANSFER_OUT" })
        .returning()
        .then((results) => results[0]);
    });
  }

  async createExchangeTransaction(
    data: Omit<BankTransaction, "id" | "type">,
  ): Promise<BankTransaction> {
    return db.transaction(async (tx) => {
      if (!data.accountId2) {
        throw new Error("accountId2 is null for EXCHANGE transaction");
      }
      if (!data.exchangeRate) {
        throw new Error("exchangeRate is null for EXCHANGE transaction");
      }

      const accounts = await tx
        .select()
        .from(bankAccountsTable)
        .where(
          or(
            eq(bankAccountsTable.id, data.accountId1),
            eq(bankAccountsTable.id, data.accountId2),
          ),
        );
      if (accounts.length != 2) {
        throw new RepoSelectNotFoundError(bankAccountsTable, {
          id1: data.accountId1,
          id2: data.accountId2,
        });
      }

      const [accountFrom, accountTo] = accounts;
      if (
        !(
          (accountFrom.isUSD && !accountTo.isUSD) ||
          (!accountFrom.isUSD && accountTo.isUSD)
        )
      ) {
        throw new Error("cannot exchange with same currency account");
      }
      if (Number(accountFrom.balance) - Number(data.amount) < 0) {
        throw new Error("insufficient balance");
      }

      await tx
        .update(bankAccountsTable)
        .set({ balance: `${bankAccountsTable.balance} - ${data.amount}` })
        .where(eq(bankAccountsTable.id, data.accountId1));
      await tx
        .update(bankAccountsTable)
        .set({
          balance: `${bankAccountsTable.balance} + ${data.amount} * ${data.exchangeRate}`,
        })
        .where(eq(bankAccountsTable.id, data.accountId2));

      return tx
        .insert(bankTransactionsTable)
        .values({ ...data, type: "EXCHANGE" })
        .returning()
        .then((results) => results[0]);
    });
  }
}
