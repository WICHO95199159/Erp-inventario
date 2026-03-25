import { db } from "../config/db.js";

export const getHerramientas = (callback) => {
  db.query("SELECT * FROM herramientas", callback);
};

export const createHerramienta = (data, callback) => {
  db.query("INSERT INTO herramientas SET ?", data, callback);
};

export const updateHerramienta = (id, data, callback) => {
  db.query(
    "UPDATE herramientas SET ? WHERE id = ?",
    [data, id],
    callback
  );
};

export const deleteHerramienta = (id, callback) => {
  db.query("DELETE FROM herramientas WHERE id = ?", [id], callback);
};