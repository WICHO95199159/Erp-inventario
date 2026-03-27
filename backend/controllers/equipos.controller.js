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
  const body = req.body;

  // 🧼 SOLO CAMPOS VÁLIDOS
  const data = {
    edificio: body.edificio,
    salon: body.salon,
    nombre: body.nombre,
    marca: body.marca,
    modelo: body.modelo,
    no_serie: body.no_serie,
    mac: body.mac,
    procesador: body.procesador,
    tipo_almacenamiento: body.tipo_almacenamiento,
    almacenamiento: body.almacenamiento,
    ram: body.ram,
    sistema_operativo: body.sistema_operativo
  };

  console.log("📦 DATA LIMPIA:", data);

  Equipo.createEquipo(data, (err, result) => {
    if (err) {
      console.log("🔥 ERROR REAL:", err);
      return res.status(500).json(err);
    }

    res.json({ id: result.insertId });
  });
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