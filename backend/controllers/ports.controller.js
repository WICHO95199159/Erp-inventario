import * as Port from "../models/ports.model.js";

export const getAll = (req, res) => {
  Port.getPorts((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

export const create = (req, res) => {
  const data = { ...req.body };

  // 🔥 NORMALIZAR A MAYÚSCULAS
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "string") {
      data[key] = data[key].toUpperCase().trim();
    }
  });

  // ❌ eliminar campos que no deben insertarse (por seguridad)
  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Port.createPort(data, (err, result) => {
    if (err) {
      console.log("🔥 ERROR REAL:", err);
      return res.status(500).json(err);
    }

    res.json({ id: result.insertId });
  });
};

export const update = (req, res) => {
  const data = { ...req.body };

  // 🔥 NORMALIZAR A MAYÚSCULAS
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "string") {
      data[key] = data[key].toUpperCase().trim();
    }
  });

  // ❌ evitar problemas en UPDATE
  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Port.updatePort(req.params.id, data, (err) => {
    if (err) {
      console.log("🔥 ERROR SQL:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Actualizado" });
  });
};

export const remove = (req, res) => {
  Port.deletePort(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};