import * as Equipo from "../models/equipos.model.js";

// GET
export const getAll = (req, res) => {
  Equipo.getEquipos((err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
};

// CREATE
export const create = (req, res) => {
  let data = { ...req.body };

  // 🔥 EXTRAER cantidad
  const cantidad = parseInt(data.cantidad) || 1;

  // ❌ ELIMINAR cantidad antes de insertar
  delete data.cantidad;

  delete data.created_at;
  delete data.updated_at;

  console.log("📦 DATA LIMPIA:", data);
  console.log("🔢 CANTIDAD:", cantidad);

  let inserted = 0;

  for (let i = 0; i < cantidad; i++) {
    Equipo.createEquipo(data, (err, result) => {
      if (err) {
        console.log("🔥 ERROR REAL:", err);
        return res.status(500).json(err);
      }

      inserted++;

      if (inserted === cantidad) {
        res.json({ message: `${cantidad} registros creados` });
      }
    });
  }
};

// UPDATE
export const update = (req, res) => {
  const data = { ...req.body };

  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  Equipo.updateEquipo(req.params.id, data, (err) => {
    if (err) {
      console.log("ERROR SQL:", err);
      return res.status(500).json(err);
    }
    res.json({ message: "Actualizado" });
  });
};

// DELETE
export const remove = (req, res) => {
  Equipo.deleteEquipo(req.params.id, (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
};