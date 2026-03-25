import { db } from "../config/db.js";

// GET
export const getEquipos = (callback) => {
  db.query("SELECT * FROM equipos_computo", callback);
};

// CREATE
export const createEquipo = (data, callback) => {
  db.query("INSERT INTO equipos_computo SET ?", data, callback);
};

// UPDATE
export const updateEquipo = (id, data, callback) => {
  db.query(
    "UPDATE equipos_computo SET ? WHERE id = ?",
    [data, id],
    callback
  );
};

// DELETE
export const deleteEquipo = (id, callback) => {
  db.query("DELETE FROM equipos_computo WHERE id = ?", [id], callback);
};