import { createRouter, createWebHistory } from "vue-router";

// 🧭 Vistas principales
import Dashboard from "../views/Dashboard.vue";
import Nodos from "../views/Nodos.vue";

// 📦 Nuevas vistas (plantillas)
import EquiposComputo from "../views/EquiposComputo.vue";
import EquiposVideo from "../views/EquiposVideo.vue";
import EquiposAudio from "../views/EquiposAudio.vue";
import Herramienta from "../views/Herramienta.vue";
import Impresora from "../views/Impresoras.vue";
import AccessPoint from "../views/AccessPoint.vue";

// 🚀 Definición de rutas
const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard
  },
  {
    path: "/nodos",
    name: "Nodos",
    component: Nodos
  },
  {
    path: "/computo",
    name: "EquiposComputo",
    component: EquiposComputo
  },
  {
    path: "/video",
    name: "EquiposVideo",
    component: EquiposVideo
  },
  {
    path: "/audio",
    name: "EquiposAudio",
    component: EquiposAudio
  },
  {
    path: "/herramienta",
    name: "Herramienta",
    component: Herramienta
  },
  {
    path: "/impresora",
    name: "Herramienta",
    component: Impresora
  },
  {
    path: "/access",
    name: "accessPoint",
    component: AccessPoint
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  },
];

// 🧠 Crear router
const router = createRouter({
  history: createWebHistory(),
  routes
});

// 🚀 Exportar
export default router;