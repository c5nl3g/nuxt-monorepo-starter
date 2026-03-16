import { db } from "@nuxt-monorepo/db";
import { usersTable } from "@nuxt-monorepo/db/schema";

export default defineEventHandler(async (event) => {
  const users = await db.select().from(usersTable);
  return users;
});
