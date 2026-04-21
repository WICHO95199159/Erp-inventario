import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

let db;

if (process.env.DATABASE_URL) {
  // 🚀 PRODUCCIÓN (Railway / futuro hosting)
  db = mysql.createPool(process.env.DATABASE_URL);
  console.log("🌐 Conectado a DB remota");
} else {
  // 💻 LOCAL (Workbench)
  db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root123", // 👈 pon tu contraseña si tienes
    database: "inventario_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });
  console.log("💻 Conectado a MySQL local");
}

export { db };