import { db } from "../config/db.js";

/* ======================================
   GET
====================================== */

export const getHerramientas = (callback) => {

    db.query(
        "SELECT * FROM herramientas",
        callback
    );

};

/* ======================================
   CREATE
====================================== */

export const createHerramienta = (data, callback) => {

    db.query(
        "INSERT INTO herramientas SET ?",
        data,
        callback
    );

};

/* ======================================
   UPDATE
====================================== */

export const updateHerramienta = (id, data, callback) => {

    db.query(
        "UPDATE herramientas SET ? WHERE id = ?",
        [data, id],
        callback
    );

};

/* ======================================
   DELETE
====================================== */

export const deleteHerramienta = (id, callback) => {

    db.query(
        "DELETE FROM herramientas WHERE id = ?",
        [id],
        callback
    );

};