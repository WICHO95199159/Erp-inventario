import * as Impresora from "../models/impresoras.model.js";

/* ======================================
   GET
====================================== */

export const getAll = (req, res) => {

    Impresora.getImpresoras((err, result) => {

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

    // Cantidad de registros a crear

    const cantidad = Math.max(
        1,
        parseInt(data.cantidad) || 1
    );

    // Campos exclusivos del frontend

    delete data.cantidad;

    // Campos automáticos de la BD

    delete data.created_at;
    delete data.updated_at;

    let inserted = 0;

    for (let i = 0; i < cantidad; i++) {

        Impresora.createImpresora(data, (err) => {

            if (err) {
                return res.status(500).json(err);
            }

            inserted++;

            if (inserted === cantidad) {

                res.json({
                    message: `${cantidad} registro${cantidad > 1 ? "s" : ""} creado${cantidad > 1 ? "s" : ""}`
                });

            }

        });

    }

};

/* ======================================
   UPDATE
====================================== */

export const update = (req, res) => {

    const data = { ...req.body };

    delete data.id;
    delete data.created_at;
    delete data.updated_at;

    Impresora.updateImpresora(req.params.id, data, (err) => {

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

    Impresora.deleteImpresora(req.params.id, (err) => {

        if (err) {
            return res.status(500).json(err);
        }

        res.json({
            message: "Registro eliminado"
        });

    });

};