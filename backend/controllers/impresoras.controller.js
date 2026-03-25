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

  Impresora.createImpresora(data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
};

// ✏️ UPDATE
export const update = (req, res) => {
  const id = req.params.id;
  const data = { ...req.body };

  delete data.id;
  delete data.created_at;   // 🔥 CLAVE
  delete data.updated_at;   // 🔥 CLAVE

  Impresora.updateImpresora(id, data, (err) => {
    if (err) {
      console.log("ERROR SQL:", err);
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