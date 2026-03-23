import { createRouter, createWebHistory } from "vue-router";

import Dashboard from "../views/Dashboard.vue";
import Nodos from "../views/Nodos.vue";

const routes = [
  { path: "/", component: Dashboard },
  { path: "/nodos", component: Nodos }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;