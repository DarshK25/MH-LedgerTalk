import 'dotenv/config';
import type { Config } from 'drizzle-kit';

export default {
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_0BPvGF1thbLI@ep-red-flower-ad6hdyd5-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require',
  },
} satisfies Config;
