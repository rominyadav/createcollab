import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "@/database/schema";

console.log("Database URL:", process.env.DATABASE_URL ? "Set" : "Not set");

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 5,
  min: 1,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
});

// Test the connection
pool.on("connect", (client) => {
  console.log("Database connected successfully");
});

pool.on("error", (err) => {
  console.error("Database connection error:", err);
});

export const db = drizzle(pool, {
  schema,
  casing: "snake_case",
});
