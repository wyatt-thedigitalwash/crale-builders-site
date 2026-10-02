import { loadEnvConfig } from '@next/env';
import { defineConfig } from 'drizzle-kit';

loadEnvConfig(process.cwd());

const url = process.env.DATABASE_URL;
const shared = { dialect: 'postgresql', schema: './src/lib/db/schema.ts', out: './drizzle' } as const;

export default url
  ? defineConfig({ ...shared, dbCredentials: { url } })
  : defineConfig({ ...shared, driver: 'pglite', dbCredentials: { url: './.data/pglite' } });
