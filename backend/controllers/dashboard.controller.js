import * as service from "../services/dashboard.service.js";

// ===================== COMPUTO =====================
export const computo = async (req, res) => {
  try {
    const data = await service.getComputo();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ===================== IMPRESORAS =====================
export const impresoras = async (req, res) => {
  try {
    const data = await service.getImpresoras();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ===================== ACCESS POINT =====================
export const accessPoint = async (req, res) => {
  try {
    const data = await service.getAccessPoint();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ===================== VIDEO =====================
export const video = async (req, res) => {
  try {
    const data = await service.getVideo();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ===================== AUDIO =====================
export const audio = async (req, res) => {
  try {
    const data = await service.getAudio();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ===================== HERRAMIENTAS =====================
export const herramientas = async (req, res) => {
  try {
    const data = await service.getHerramientas();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

// ===================== NODOS =====================
export const nodos = async (req, res) => {
  try {
    const data = await service.getNodos();
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCounts = async (req, res) => {
  try {
    const data = await service.getCounts();

    res.json({
      nodos: data.nodos || 0,
      computo: data.computo || 0,
      impresoras: data.impresoras || 0,
      access_point: data.access_point || 0,
      video: data.video || 0,
      audio: data.audio || 0,
      herramientas: data.herramientas || 0,
    });

  } catch (error) {
    console.error("Error en counts:", error);

    res.json({
      nodos: 0,
      computo: 0,
      impresoras: 0,
      access_point: 0,
      video: 0,
      audio: 0,
      herramientas: 0,
    });
  }
};