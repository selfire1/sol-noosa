import { defineConfig } from 'drizzle-kit'
import { ENV } from 'varlock/env'

export default defineConfig({
  dialect: 'turso',
  schema: './lib/db/schema.ts',
  dbCredentials: {
    url: ENV.TURSO_DB_URL,
    authToken: ENV.TURSO_TOKEN,
  },
})
