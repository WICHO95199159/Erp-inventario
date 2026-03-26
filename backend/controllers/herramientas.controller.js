import * as Herramienta from "../models/herramientas.model.js";

export const getAll = (req, res) => {
  Herramienta.getHerramientas((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const create = (req, res) => {
  const data = { ...req.body };

  const cantidad = parseInt(data.cantidad) || 1;
  delete data.cantidad;

  delete data.created_at;
  delete data.updated_at;

  const queries = [];

  for (let i = 0; i < cantidad; i++) {
    queries.push(
      new Promise((resolve, reject) => {
        Herramienta.createHerramienta(data, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      })
    );
  }

  Promise.all(queries)
    .then(() => res.json({ message: "Registros creados correctamente" }))
    .catch(err => {
      console.log("ERROR REAL:", err);
      res.status(500).json(err);
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