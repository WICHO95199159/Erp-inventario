import { db } from "../config/db.js";

// 📥 GET ALL
export const getEquiposVideo = (callback) => {
  db.query("SELECT * FROM equipos_video", callback);
};

// ➕ CREATE
export const createEquipoVideo = (data, callback) => {
  db.query("INSERT INTO equipos_video SET ?", data, callback);
};

// ✏️ UPDATE
export const updateEquipoVideo = (id, data, callback) => {
  db.query(
    "UPDATE equipos_video SET ? WHERE id = ?",
    [data, id],
    callback
  );
};

// ❌ DELETE
export const deleteEquipoVideo = (id, callback) => {
  db.query("DELETE FROM equipos_video WHERE id = ?", [id], callback);
};