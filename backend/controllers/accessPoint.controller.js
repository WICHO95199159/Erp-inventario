import * as AccessPoint from "../models/accessPoint.model.js";

// 🔍 GET
export const getAll = (req, res) => {
  AccessPoint.getAccessPoints((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ➕ CREATE
export const create = (req, res) => {
  const data = { ...req.body };

  // 🔥 SOLO ESTOS CAMPOS A MAYÚSCULAS
  const fieldsToUpper = ["ubicacion", "marca", "modelo", "no_serie"];

  fieldsToUpper.forEach(field => {
    if (data[field] && typeof data[field] === "string") {
      data[field] = data[field].toUpperCase().trim();
    }
  });

  // ❌ limpiar campos innecesarios
  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  AccessPoint.createAccessPoint(data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
};

// ✏️ UPDATE
export const update = (req, res) => {
  const data = { ...req.body };

  // 🔥 SOLO ESTOS CAMPOS A MAYÚSCULAS
  const fieldsToUpper = ["ubicacion", "marca", "modelo", "no_serie"];

  fieldsToUpper.forEach(field => {
    if (data[field] && typeof data[field] === "string") {
      data[field] = data[field].toUpperCase().trim();
    }
  });

  // ❌ evitar conflictos
  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  AccessPoint.updateAccessPoint(req.params.id, data, (err) => {
    if (err) {
      console.log("ERROR SQL:", err);
      return res.status(500).json(err);
    }

    res.json({ message: "Actualizado" });
  });
};

// ❌ DELETE
export const remove = (req, res) => {
  AccessPoint.deleteAccessPoint(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};