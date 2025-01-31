import type { Config } from "@/server/infrastructure/models/config.model";
import { db } from "..";
import { configsTable } from "../schema/schema";

const configs: Config[] = [
  { key: "BASE_CURRENCY", value: process.env.BASE_CURRENCY! },
];

async function main() {
  console.info("> Setting up configs...");
  const configResults = await db
    .insert(configsTable)
    .values(configs)
    .returning();
  console.info("> Configs setup successfully", configResults);
}

main();
