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

  const cantidad = parseInt(data.cantidad) || 1;

  // 🔥 importante: eliminar cantidad para no enviarla a la DB
  delete data.cantidad;
  delete data.created_at;
  delete data.updated_at;

  const queries = [];

  for (let i = 0; i < cantidad; i++) {
    queries.push(
      new Promise((resolve, reject) => {
        Video.createEquipoVideo(data, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      })
    );
  }

  Promise.all(queries)
    .then(() => {
      res.json({ message: `${cantidad} registro(s) creados correctamente` });
    })
    .catch((err) => {
      console.log("ERROR REAL:", err);
      res.status(500).json(err);
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