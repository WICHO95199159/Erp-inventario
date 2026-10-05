import { db } from "../config/db.js";

export const getCounts = async () => {
  const [rows] = await db.promise().query(`
    SELECT 
      (SELECT COUNT(*) FROM ports) AS nodos,
      (SELECT COUNT(*) FROM equipos_computo) AS computo,
      (SELECT COUNT(*) FROM impresoras) AS impresoras,
      (SELECT COUNT(*) FROM access_points) AS access_point,
      (SELECT COUNT(*) FROM equipos_video) AS video,
      (SELECT COUNT(*) FROM equipos_audio) AS audio,
      (SELECT COUNT(*) FROM herramientas) AS herramientas
  `);

  return rows[0];
};

// ===================== COMPUTO =====================
export const getComputo = async () => {
  const [edificio] = await db.promise().query(
    "SELECT edificio AS label, COUNT(*) AS total FROM equipos_computo GROUP BY edificio"
  );

  const [estatus] = await db.promise().query(
    "SELECT estatus AS label, COUNT(*) AS total FROM equipos_computo GROUP BY estatus"
  );

  const [almacenamiento] = await db.promise().query(
    "SELECT tipo_almacenamiento AS label, COUNT(*) AS total FROM equipos_computo GROUP BY tipo_almacenamiento"
  );

  const [so] = await db.promise().query(
    "SELECT sistema_operativo AS label, COUNT(*) AS total FROM equipos_computo GROUP BY sistema_operativo"
  );

  const [licencia_so] = await db.promise().query(
    "SELECT licencia_so AS label, COUNT(*) AS total FROM equipos_computo GROUP BY licencia_so"
  );

  const [procesador] = await db.promise().query(
    "SELECT procesador AS label, COUNT(*) AS total FROM equipos_computo GROUP BY procesador"
  );

  const [congelado] = await db.promise().query(
    "SELECT congelado AS label, COUNT(*) AS total FROM equipos_computo GROUP BY congelado"
  );

  const [marca] = await db.promise().query(
    "SELECT marca AS label, COUNT(*) AS total FROM equipos_computo GROUP BY marca"
  );

  return { edificio, estatus, almacenamiento, so, licencia_so, procesador, congelado, marca };
};

// ===================== IMPRESORAS =====================
export const getImpresoras = async () => {
  const [tipo] = await db.promise().query(
    "SELECT tipo AS label, COUNT(*) AS total FROM impresoras GROUP BY tipo"
  );

  const [marca] = await db.promise().query(
    "SELECT marca AS label, COUNT(*) AS total FROM impresoras GROUP BY marca"
  );

  const [conexion] = await db.promise().query(
    "SELECT conexion AS label, COUNT(*) AS total FROM impresoras GROUP BY conexion"
  );

  return { tipo, marca, conexion };
};

// ===================== ACCESS POINT =====================
export const getAccessPoint = async () => {
  
  const [marca] = await db.promise().query(
    "SELECT marca AS label, COUNT(*) AS total FROM access_points GROUP BY marca"
  );

  const [ssid] = await db.promise().query(
    "SELECT ssid AS label, COUNT(*) AS total FROM access_points GROUP BY ssid"
  );

  return { marca, ssid };
};

// ===================== VIDEO =====================
export const getVideo = async () => {

  const [tipo] = await db.promise().query(
    "SELECT tipo AS label, COUNT(*) AS total FROM equipos_video GROUP BY tipo"
  );

  const [marca] = await db.promise().query(
    "SELECT marca AS label, COUNT(*) AS total FROM equipos_video GROUP BY marca"
  );

  return { tipo, marca };
};

// ===================== AUDIO =====================
export const getAudio = async () => {
  const [tipo] = await db.promise().query(
    "SELECT tipo AS label, COUNT(*) AS total FROM equipos_audio GROUP BY tipo"
  );

  const [marca] = await db.promise().query(
    "SELECT marca AS label, COUNT(*) AS total FROM equipos_audio GROUP BY marca"
  );

  return { tipo, marca };
};

// ===================== HERRAMIENTAS =====================
export const getHerramientas = async () => {
  const [tipo] = await db.promise().query(
    "SELECT tipo AS label, COUNT(*) AS total FROM herramientas GROUP BY tipo"
  );

  const [nombre] = await db.promise().query(
    "SELECT nombre AS label, COUNT(*) AS total FROM herramientas GROUP BY nombre"
  );

  return { tipo, nombre };
};

// ===================== NODOS =====================
export const getNodos = async () => {
  const [data] = await db.promise().query(
    "SELECT location AS label, COUNT(*) AS total FROM ports GROUP BY location"
  );

  return data;
};