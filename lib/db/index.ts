import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import { ENV } from 'varlock/env'

import * as schema from './schema'

const client = createClient({
  url: ENV.TURSO_DB_URL,
  authToken: ENV.TURSO_TOKEN,
})

export const db = drizzle(client, { schema })
