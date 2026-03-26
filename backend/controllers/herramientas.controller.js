import * as Herramienta from "../models/herramientas.model.js";

export const getAll = (req, res) => {
  Herramienta.getHerramientas((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const create = (req, res) => {
  const data = { ...req.body };

  delete data.created_at;
  delete data.updated_at;

  Herramienta.createHerramienta(data, (err, result) => {
    if (err) {
      console.log("ERROR REAL:", err);
      return res.status(500).json(err);
    }
    res.json({ id: result.insertId });
  });
};

export const update = (req, res) => {
  const data = { ...req.body };

  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Herramienta.updateHerramienta(req.params.id, data, (err) => {
    if (err) {
      console.log("ERROR REAL:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Actualizado" });
  });
};

export const remove = (req, res) => {
  Herramienta.deleteHerramienta(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};