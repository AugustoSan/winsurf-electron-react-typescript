// connection.ts
import { Client } from "pg";
import dotenv from "dotenv";

dotenv.config();

const connectionString = process.env.PG_CONNECTION_STRING;
if (!connectionString) {
  throw new Error("La variable PG_CONNECTION_STRING no está definida.");
}

export const pgClient = new Client({ connectionString });

export async function connectDB(): Promise<void> {
  try {
    await pgClient.connect();
    console.log("Conectado a PostgreSQL");
  } catch (error) {
    console.error("Error al conectar a PostgreSQL:", error);
    throw error;
  }
}
