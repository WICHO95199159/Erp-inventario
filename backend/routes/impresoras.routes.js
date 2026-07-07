import express from "express";
import * as controller from "../controllers/impresoras.controller.js";

const router = express.Router();

/* ======================================
   GET
====================================== */

router.get("/", controller.getAll);

/* ======================================
   CREATE
====================================== */

router.post("/", controller.create);

/* ======================================
   UPDATE
====================================== */

router.put("/:id", controller.update);

/* ======================================
   DELETE
====================================== */

router.delete("/:id", controller.remove);

export default router;