import { timestamp } from "drizzle-orm/pg-core";

export const timestampColumns = {
  createdAt: timestamp("created_at", { precision: 6, withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", {
    precision: 6,
    withTimezone: true,
  })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
};
