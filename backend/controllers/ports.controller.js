import * as Port from "../models/ports.model.js";

/* ======================================
   GET
====================================== */

export const getAll = (req, res) => {

    Port.getPorts((err, result) => {

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

    // Campos exclusivos del frontend
    delete data.cantidad;

    // Campos automáticos de la BD
    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    Port.createPort(data, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Registro creado"
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

    Port.updatePort(req.params.id, data, (err) => {

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

    Port.deletePort(req.params.id, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Registro eliminado"
        });

    });

};