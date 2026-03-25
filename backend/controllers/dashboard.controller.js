import { db } from "../config/db.js";

export const getCounts = (req, res) => {
  const queries = {
    nodos: "SELECT COUNT(*) AS total FROM ports",
    computo: "SELECT COUNT(*) AS total FROM equipos_computo",
    impresoras: "SELECT COUNT(*) AS total FROM impresoras",
    access_point: "SELECT COUNT(*) AS total FROM access_points",
    video: "SELECT COUNT(*) AS total FROM equipos_video",
    audio: "SELECT COUNT(*) AS total FROM equipos_audio",
    herramientas: "SELECT COUNT(*) AS total FROM herramientas"
  };

  const results = {};
  let completed = 0;
  const totalQueries = Object.keys(queries).length;

  for (const key in queries) {
    db.query(queries[key], (err, result) => {
      if (err) return res.status(500).json(err);

      results[key] = result[0].total;
      completed++;

      if (completed === totalQueries) {
        res.json(results);
      }
    });
  }
};