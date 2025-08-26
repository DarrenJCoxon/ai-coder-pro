import { pgTable, serial, text, timestamp, boolean, integer, varchar } from 'drizzle-orm/pg-core'

// Educational Resources table for the AI Coder Pro platform
export const educationalResources = pgTable('educational_resources', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  resourceType: varchar('resource_type', { length: 100 }).notNull(), // e.g., 'Interactive Lab', 'Virtual Timeline'
  subject: varchar('subject', { length: 100 }), // e.g., 'Biology', 'History', 'Mathematics'
  yearGroup: varchar('year_group', { length: 50 }), // e.g., 'Year 7', 'Year 10'
  features: text('features'), // JSON string of feature list
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  isActive: boolean('is_active').default(true).notNull(),
})

// User prompts table to track lesson ideas submitted
export const userPrompts = pgTable('user_prompts', {
  id: serial('id').primaryKey(),
  prompt: text('prompt').notNull(),
  generatedResourceId: integer('generated_resource_id').references(() => educationalResources.id),
  userAgent: varchar('user_agent', { length: 500 }),
  ipAddress: varchar('ip_address', { length: 45 }), // IPv6 support
  createdAt: timestamp('created_at').defaultNow().notNull(),
})

// Analytics table for tracking usage patterns
export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  eventType: varchar('event_type', { length: 100 }).notNull(), // e.g., 'prompt_submitted', 'resource_generated'
  resourceId: integer('resource_id').references(() => educationalResources.id),
  promptId: integer('prompt_id').references(() => userPrompts.id),
  metadata: text('metadata'), // JSON string for additional data
  timestamp: timestamp('timestamp').defaultNow().notNull(),
})

// Export types for TypeScript inference
export type EducationalResource = typeof educationalResources.$inferSelect
export type NewEducationalResource = typeof educationalResources.$inferInsert
export type UserPrompt = typeof userPrompts.$inferSelect
export type NewUserPrompt = typeof userPrompts.$inferInsert
export type Analytics = typeof analytics.$inferSelect
export type NewAnalytics = typeof analytics.$inferInsert