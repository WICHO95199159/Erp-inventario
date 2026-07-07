import { db } from "../config/db.js";

/* ======================================
   GET
====================================== */

export const getPorts = (callback) => {

    db.query(
        "SELECT * FROM ports",
        callback
    );

};

/* ======================================
   CREATE
====================================== */

export const createPort = (data, callback) => {

    db.query(
        "INSERT INTO ports SET ?",
        data,
        callback
    );

};

/* ======================================
   UPDATE
====================================== */

export const updatePort = (id, data, callback) => {

    db.query(
        "UPDATE ports SET ? WHERE id = ?",
        [data, id],
        callback
    );

};

/* ======================================
   DELETE
====================================== */

export const deletePort = (id, callback) => {

    db.query(
        "DELETE FROM ports WHERE id = ?",
        [id],
        callback
    );

};