import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboard.routes.js";
import portsRoutes from "./routes/ports.routes.js";
import equiposRoutes from "./routes/equipos.routes.js";
import impresorasRoutes from "./routes/impresoras.routes.js";
import accessPointRoutes from "./routes/accessPoint.routes.js";
import equiposVideoRoutes from "./routes/equiposVideo.routes.js";
import equiposAudioRoutes from "./routes/equiposAudio.routes.js";
import herramientasRoutes from "./routes/herramientas.routes.js";


import { db } from "./config/db.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/dashboard", dashboardRoutes);
app.use("/api/ports", portsRoutes);
app.use("/api/equipos", equiposRoutes);
app.use("/api/impresoras", impresorasRoutes);
app.use("/api/access-point", accessPointRoutes);
app.use("/api/equipos-video", equiposVideoRoutes);
app.use("/api/equipos-audio", equiposAudioRoutes);
app.use("/api/herramientas", herramientasRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000");
});

db.connect((err) => {
  if (err) {
    console.error("Error de conexión:", err);
  } else {
    console.log("Conectado a Railway MySQL 🚀");
  }
});

//Local

// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import portsRoutes from "./routes/ports.routes.js";

// import { db } from "./config/db.js";

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/ports", portsRoutes);

// app.listen(3000, () => {
//   console.log("Servidor corriendo en puerto 3000");
// });


// db.connect((err) => {
//   if (err) {
//     console.error("Error de conexión:", err);
//   } else {
//     console.log("Conectado a MySQL 🎉");
//   }
// });