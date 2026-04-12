import "dotenv/config";
import { neon, Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle as drizzleHttp } from "drizzle-orm/neon-http";
import { drizzle as drizzleWs } from "drizzle-orm/neon-serverless";
import { relations } from "./relations";

// Required for PlanetScale Postgres HTTP connections
neonConfig.fetchEndpoint = (host) => `https://${host}/sql`;

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzleHttp({ client: sql, relations });

// Required for PlanetScale Postgres WebSocket connections
neonConfig.pipelineConnect = false;
neonConfig.wsProxy = (host, port) => `${host}/v2?address=${host}:${port}`;

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });
export const dbPool = drizzleWs({ client: pool, relations });
