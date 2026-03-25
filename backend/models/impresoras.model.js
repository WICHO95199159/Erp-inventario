import { db } from "../config/db.js";

// 🔍 GET ALL
export const getImpresoras = (callback) => {
  db.query("SELECT * FROM impresoras", callback);
};

// ➕ CREATE
export const createImpresora = (data, callback) => {
  db.query("INSERT INTO impresoras SET ?", data, callback);
};

// ✏️ UPDATE
export const updateImpresora = (id, data, callback) => {
  delete data.id; // 🔥 evitar conflictos

  db.query(
    "UPDATE impresoras SET ? WHERE id = ?",
    [data, id],
    callback
  );
};

// 🗑️ DELETE
export const deleteImpresora = (id, callback) => {
  db.query("DELETE FROM impresoras WHERE id = ?", [id], callback);
};