import { db } from "../config/db.js";

/* ======================================
   GET
====================================== */

export const getEquiposAudio = (callback) => {

    db.query(
        "SELECT * FROM equipos_audio",
        callback
    );

};

/* ======================================
   CREATE
====================================== */

export const createEquipoAudio = (data, callback) => {

    db.query(
        "INSERT INTO equipos_audio SET ?",
        data,
        callback
    );

};

/* ======================================
   UPDATE
====================================== */

export const updateEquipoAudio = (id, data, callback) => {

    db.query(
        "UPDATE equipos_audio SET ? WHERE id = ?",
        [data, id],
        callback
    );

};

/* ======================================
   DELETE
====================================== */

export const deleteEquipoAudio = (id, callback) => {

    db.query(
        "DELETE FROM equipos_audio WHERE id = ?",
        [id],
        callback
    );

};