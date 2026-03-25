import * as Audio from "../models/equiposAudio.model.js";

// GET
export const getAll = (req, res) => {
  Audio.getEquiposAudio((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// CREATE
export const create = (req, res) => {
  const data = { ...req.body };

  delete data.created_at;
  delete data.updated_at;

  Audio.createEquipoAudio(data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
};

// UPDATE
export const update = (req, res) => {
  const data = { ...req.body };

  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Audio.updateEquipoAudio(req.params.id, data, (err) => {
    if (err) {
      console.log("ERROR SQL:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Actualizado" });
  });
};

// DELETE
export const remove = (req, res) => {
  Audio.deleteEquipoAudio(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};