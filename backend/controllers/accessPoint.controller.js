import * as AccessPoint from "../models/accessPoint.model.js";

/* ======================================
   GET
====================================== */

export const getAll = (req, res) => {

    AccessPoint.getAccessPoints((err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json(result);

    });

};

/* ======================================
   CREATE
====================================== */

export const create = (req, res) => {

    const data = { ...req.body };

    // Campos automáticos de la BD
    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    AccessPoint.createAccessPoint(data, (err, result) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            id: result.insertId
        });

    });

};

/* ======================================
   UPDATE
====================================== */

export const update = (req, res) => {

    const data = { ...req.body };

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    AccessPoint.updateAccessPoint(req.params.id, data, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Registro actualizado"
        });

    });

};

/* ======================================
   DELETE
====================================== */

export const remove = (req, res) => {

    AccessPoint.deleteAccessPoint(req.params.id, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Registro eliminado"
        });

    });

};