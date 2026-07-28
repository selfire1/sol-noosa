import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const cars = sqliteTable('cars', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => {
      return crypto.randomUUID()
    }),
  name: text('name').notNull(),
  type: text('type').notNull(),
  seats: integer('seats').notNull(),
  transmission: text('transmission').notNull(),
  pricePerDay: integer('price_per_day').notNull(),
  imageUrl: text('image_url'),
  imageKey: text('image_key'),
  published: integer('published', { mode: 'boolean' }).notNull().default(true),
  sortOrder: integer('sort_order').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => {
      return new Date()
    }),
  updatedAt: integer('updated_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => {
      return new Date()
    }),
})

export const enquiries = sqliteTable('enquiries', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  phoneNumber: text('phone_number').notNull(),
  email: text('email').notNull(),
  message: text('message').notNull(),
  receivedAt: integer('received_at', { mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => {
      return new Date()
    }),
})

export type CarRow = typeof cars.$inferSelect
export type EnquiryRow = typeof enquiries.$inferSelect
