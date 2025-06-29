import { Pool } from 'pg';

const connectionString = import.meta.env.VITE_SUPABASE_DB_URL as string;

export const db = new Pool({ connectionString });

