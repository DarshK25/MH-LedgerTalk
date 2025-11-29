import { pgTable, serial, varchar, timestamp, text, integer, boolean, jsonb } from 'drizzle-orm/pg-core';

// Organizations table
export const organizations = pgTable('organizations', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  slug: varchar('slug', { length: 255 }).notNull().unique(),
  industry: varchar('industry', { length: 100 }),
  legalStructure: varchar('legal_structure', { length: 100 }),
  businessStage: varchar('business_stage', { length: 100 }),
  description: text('description'),
  teamSize: varchar('team_size', { length: 50 }),
  revenueRange: varchar('revenue_range', { length: 50 }),
  departments: jsonb('departments'),
  agentConfig: jsonb('agent_config'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// User organizations (many-to-many)
export const userOrganizations = pgTable('user_organizations', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull(), // Clerk user ID
  organizationId: integer('organization_id').notNull().references(() => organizations.id),
  role: varchar('role', { length: 50 }).notNull().default('member'), // owner, admin, member, viewer
  status: varchar('status', { length: 50 }).notNull().default('active'), // active, pending, suspended
  joinedAt: timestamp('joined_at').notNull().defaultNow(),
  invitedBy: varchar('invited_by', { length: 255 }),
});

// Invite codes
export const inviteCodes = pgTable('invite_codes', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 100 }).notNull().unique(),
  organizationId: integer('organization_id').notNull().references(() => organizations.id),
  role: varchar('role', { length: 50 }).notNull().default('member'),
  createdBy: varchar('created_by', { length: 255 }).notNull(),
  expiresAt: timestamp('expires_at'),
  maxUses: integer('max_uses'),
  currentUses: integer('current_uses').notNull().default(0),
  isActive: boolean('is_active').notNull().default(true),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

// User onboarding status
export const userOnboarding = pgTable('user_onboarding', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 255 }).notNull().unique(),
  currentStep: varchar('current_step', { length: 100 }),
  completedSteps: jsonb('completed_steps'),
  isComplete: boolean('is_complete').notNull().default(false),
  hasSeenTour: boolean('has_seen_tour').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// Type exports
export type Organization = typeof organizations.$inferSelect;
export type NewOrganization = typeof organizations.$inferInsert;
export type UserOrganization = typeof userOrganizations.$inferSelect;
export type NewUserOrganization = typeof userOrganizations.$inferInsert;
export type InviteCode = typeof inviteCodes.$inferSelect;
export type NewInviteCode = typeof inviteCodes.$inferInsert;
export type UserOnboarding = typeof userOnboarding.$inferSelect;
export type NewUserOnboarding = typeof userOnboarding.$inferInsert;
