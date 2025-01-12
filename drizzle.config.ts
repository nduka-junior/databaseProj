import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";
dotenv.config({
  path: ".env.local",
});

// const connectionString = process.env.DATABASE_URL;

// export default {
//   schema: "./src/db/schema.ts",
//   out: "./drizzle",
//   driver: "postgresql", // 'postgresql' | 'mysql' | 'sqlite'
//   dbCredentials: {
//     connectionString: connectionString!,
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   },
// } satisfies Config;

// export default defineConfig({
//   schema: "./src/db/schema.ts",
//   out: "./drizzle",
//   dialect: "mysql", // 'postgresql' | 'mysql' | 'sqlite'
//   dbCredentials: {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASSWORD,
//     database: process.env.DB_NAME,
//   },
// }) satisfies Config

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",

  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
