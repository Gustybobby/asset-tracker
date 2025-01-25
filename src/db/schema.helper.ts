import { timestamp } from "drizzle-orm/pg-core";

export const timestamptz = (name: string) =>
  timestamp(name, { precision: 6, withTimezone: true });

export const timestampColumns = {
  createdAt: timestamptz("created_at").defaultNow().notNull(),
  updatedAt: timestamptz("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};
