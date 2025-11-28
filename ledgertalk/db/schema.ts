// Database schema definitions
import { pgTable, text, timestamp, integer, boolean, decimal, jsonb } from 'drizzle-orm/pg-core';

// TODO: Define your database schema here
export const users = pgTable('users', {
    id: text('id').primaryKey(),
    email: text('email').notNull().unique(),
    name: text('name'),
    createdAt: timestamp('created_at').defaultNow(),
});

export const organisations = pgTable('organisations', {
    id: text('id').primaryKey(),
    name: text('name').notNull(),
    gstin: text('gstin'),
    createdAt: timestamp('created_at').defaultNow(),
});
