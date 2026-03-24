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
  AccessPoint.createAccessPoint(req.body, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
};

// ✏️ UPDATE
export const update = (req, res) => {
  const data = { ...req.body };

  delete data.id;
  delete data.created_at;   // 🔥 CLAVE
  delete data.updated_at;   // 🔥 CLAVE

  AccessPoint.updateAccessPoint(
    req.params.id,
    data,
    (err) => {
      if (err) {
        console.log("ERROR SQL:", err);
        return res.status(500).json(err);
      }

      res.json({ message: "Actualizado" });
    }
  );
};

// ❌ DELETE
export const remove = (req, res) => {
  AccessPoint.deleteAccessPoint(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};