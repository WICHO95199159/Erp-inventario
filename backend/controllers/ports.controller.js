import * as Port from "../models/ports.model.js";

export const getAll = (req, res) => {
  Port.getPorts((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const create = (req, res) => {
  Port.createPort(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
};

export const update = (req, res) => {
  Port.updatePort(req.params.id, req.body, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Actualizado" });
  });
};

export const remove = (req, res) => {
  Port.deletePort(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};