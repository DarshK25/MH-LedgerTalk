import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Get database connection string from environment variable
const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/ledgertalk';

// Create postgres client
const client = postgres(connectionString);

// Create drizzle instance
export const db = drizzle(client, { schema });
