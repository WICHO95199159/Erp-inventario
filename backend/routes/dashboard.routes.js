import express from "express";
import * as controller from "../controllers/dashboard.controller.js";

const router = express.Router();

router.get("/computo", controller.computo);
router.get("/impresoras", controller.impresoras);
router.get("/access-point", controller.accessPoint);
router.get("/video", controller.video);
router.get("/audio", controller.audio);
router.get("/herramientas", controller.herramientas);
router.get("/nodos", controller.nodos);
router.get("/counts", controller.getCounts);

export default router;