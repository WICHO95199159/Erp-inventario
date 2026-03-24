import * as Video from "../models/equiposVideo.model.js";

// 📥 GET
export const getAll = (req, res) => {
  Video.getEquiposVideo((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// ➕ CREATE
export const create = (req, res) => {
  const data = { ...req.body };

  delete data.created_at;
  delete data.updated_at;

  Video.createEquipoVideo(data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
};

// ✏️ UPDATE
export const update = (req, res) => {
  const data = { ...req.body };

  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Video.updateEquipoVideo(req.params.id, data, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Actualizado" });
  });
};

// ❌ DELETE
export const remove = (req, res) => {
  Video.deleteEquipoVideo(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};