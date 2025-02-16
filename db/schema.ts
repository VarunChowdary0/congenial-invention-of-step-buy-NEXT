import { mysqlTable, varchar, datetime, int } from 'drizzle-orm/mysql-core';

export const users = mysqlTable('users', {
  Id: varchar('id', { length: 255 }).primaryKey(),
  Name: varchar('name', { length: 255 }).notNull(),
  Email: varchar('email', { length: 255 }).notNull().unique(),
  Phone: varchar('phone', { length: 15 }).notNull().unique(),
});

export const authentidatas = mysqlTable('authentidatas', {
    Id : varchar('id', { length: 255 }).primaryKey(),
    UserId : varchar('userId', { length: 255 }).notNull().references(() => users.Id),
    KeyHash : varchar('keyhash', { length: 255 }).notNull(),
});


// npx drizzle-kit generate:mysql
// npx drizzle-kit push
  