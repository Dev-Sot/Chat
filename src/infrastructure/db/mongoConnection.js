/**
 * INFRASTRUCTURE LAYER — Conexión a MongoDB.
 * Detalle externo, completamente aislado del dominio.
 */
const { MongoClient } = require("mongodb");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017";
const DB_NAME = process.env.DB_NAME || "chat_db";

let db = null;

async function connectDB() {
  if (db) return db;

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  db = client.db(DB_NAME);
  console.log(` MongoDB conectado: ${DB_NAME}`);
  return db;
}

function getDB() {
  if (!db) throw new Error("Base de datos no inicializada. Llama connectDB() primero.");
  return db;
}

module.exports = { connectDB, getDB };
