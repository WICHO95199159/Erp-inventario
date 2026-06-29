import * as Audio from "../models/equiposAudio.model.js";

// GET
export const getAll = (req, res) => {
  Audio.getEquiposAudio((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// CREATE
export const create = async (req, res) => {
  try {
    const cantidad = Number(req.body.cantidad) || 1;

    const data = { ...req.body };

    delete data.cantidad;
    delete data.created_at;
    delete data.updated_at;

    for (let i = 0; i < cantidad; i++) {
      await new Promise((resolve, reject) => {
        Audio.createEquipoAudio(data, (err) => {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    res.json({
      message: `${cantidad} registro(s) creado(s)`
    });

  } catch (err) {
    res.status(500).json(err);
  }
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