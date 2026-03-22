import { db } from "../config/db.js";

export const getPorts = (callback) => {
  db.query("SELECT * FROM ports", callback);
};

export const createPort = (data, callback) => {
  db.query("INSERT INTO ports SET ?", data, callback);
};

export const updatePort = (id, data, callback) => {
  db.query("UPDATE ports SET ? WHERE id = ?", [data, id], callback);
};

export const deletePort = (id, callback) => {
  db.query("DELETE FROM ports WHERE id = ?", [id], callback);
};