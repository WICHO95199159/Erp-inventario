import express from "express";
import { db } from "../config/db.js";

const router = express.Router();


// 🔹 GET — obtener todas las impresoras
router.get("/", (req, res) => {
  db.query("SELECT * FROM impresoras ORDER BY id DESC", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});


// 🔹 POST — crear impresora
router.post("/", (req, res) => {
  const data = req.body;

  db.query("INSERT INTO impresoras SET ?", data, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    res.json({ message: "Impresora creada", id: result.insertId });
  });
});


// 🔹 PUT — actualizar impresora
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const data = { ...req.body };

  delete data.id;
  delete data.created_at;
  delete data.updated_at;

  db.query(
    "UPDATE impresoras SET ? WHERE id = ?",
    [data, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json({ message: "Impresora actualizada" });
    }
  );
});


// 🔹 DELETE — eliminar impresora
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM impresoras WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Impresora eliminada" });
  });
});


export default router;