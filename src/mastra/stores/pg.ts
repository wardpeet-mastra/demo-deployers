import { PostgresStore } from "@mastra/pg";

export const store = new PostgresStore({
  connectionString:
    "postgresql://postgres.rmhfybpfnykanqddfyjh:Zue8XbZqVpwszTsR@aws-0-eu-north-1.pooler.supabase.com:6543/postgres",
});
