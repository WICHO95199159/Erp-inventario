import { db } from "../config/db.js";

/* ======================================
   GET
====================================== */

export const getAccessPoints = (callback) => {

    db.query(
        "SELECT * FROM access_points",
        callback
    );

};

/* ======================================
   CREATE
====================================== */

export const createAccessPoint = (data, callback) => {

    db.query(
        "INSERT INTO access_points SET ?",
        data,
        callback
    );

};

/* ======================================
   UPDATE
====================================== */

export const updateAccessPoint = (id, data, callback) => {

    db.query(
        "UPDATE access_points SET ? WHERE id = ?",
        [data, id],
        callback
    );

};

/* ======================================
   DELETE
====================================== */

export const deleteAccessPoint = (id, callback) => {

    db.query(
        "DELETE FROM access_points WHERE id = ?",
        [id],
        callback
    );

};