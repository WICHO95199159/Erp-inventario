import * as Impresora from "../models/impresoras.model.js";

// 🔍 GET ALL
export const getAll = (req, res) => {
  Impresora.getImpresoras((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ➕ CREATE
export const create = (req, res) => {
  const data = { ...req.body };

  // 🔥 NORMALIZAR A MAYÚSCULAS
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "string") {
      data[key] = data[key].toUpperCase().trim();
    }
  });

  // ❌ eliminar campos que no deben insertarse
  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Impresora.createImpresora(data, (err, result) => {
    if (err) {
      console.log("🔥 ERROR REAL:", err);
      return res.status(500).json(err);
    }

    res.json({ id: result.insertId });
  });
};

// ✏️ UPDATE
export const update = (req, res) => {
  const id = req.params.id;
  const data = { ...req.body };

  // 🔥 NORMALIZAR A MAYÚSCULAS
  Object.keys(data).forEach(key => {
    if (typeof data[key] === "string") {
      data[key] = data[key].toUpperCase().trim();
    }
  });

  // ❌ evitar conflictos en update
  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Impresora.updateImpresora(id, data, (err) => {
    if (err) {
      console.log("🔥 ERROR SQL:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Actualizado" });
  });
};

// 🗑️ DELETE
export const remove = (req, res) => {
  const id = req.params.id;

  Impresora.deleteImpresora(id, (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Eliminado" });
  });
};