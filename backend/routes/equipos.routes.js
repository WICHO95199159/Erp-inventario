import express from "express";
import { db } from "../config/db.js";

const router = express.Router();

// 🔹 GET
router.get("/", (req, res) => {
  db.query("SELECT * FROM equipos_computo", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// 🔹 POST
router.post("/", (req, res) => {
  const data = req.body;

  db.query("INSERT INTO equipos_computo SET ?", data, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json({ id: result.insertId });
  });
});

// 🔹 PUT
router.put("/:id", (req, res) => {
  const { id } = req.params;

  const data = { ...req.body };

  delete data.id;
  delete data.created_at;

  data.updated_at = new Date()
    .toISOString()
    .slice(0, 19)
    .replace("T", " ");

  db.query(
    "UPDATE equipos_computo SET ? WHERE id = ?",
    [data, id],
    (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json(err);
      }

      res.json({ message: "Actualizado" });
    }
  );
});

// 🔹 DELETE
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  db.query("DELETE FROM equipos_computo WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Eliminado" });
  });
});

export default router;