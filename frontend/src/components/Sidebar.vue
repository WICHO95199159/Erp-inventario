<template>

  <div class="sidebar">

    <!-- ======================================
         LOGO / AURORA CORE
    ======================================= -->

    <h2
        class="logo"
        @click="registerClick"
    >
        📊 Inventario
    </h2>

    <!-- ======================================
         NAVEGACIÓN
    ======================================= -->

    <nav>

      <router-link
        to="/"
        class="link"
      >
        <span class="icon">🏠</span>
        <span>Dashboard</span>
      </router-link>

      <router-link
        to="/computo"
        class="link"
      >
        <span class="icon">💻</span>
        <span>Cómputo</span>
      </router-link>

      <router-link
        to="/video"
        class="link"
      >
        <span class="icon">📺</span>
        <span>Video</span>
      </router-link>

      <router-link
        to="/audio"
        class="link"
      >
        <span class="icon">🔊</span>
        <span>Audio</span>
      </router-link>

      <router-link
        to="/impresora"
        class="link"
      >
        <span class="icon">🖨️</span>
        <span>Impresoras</span>
      </router-link>

      <router-link
        to="/access"
        class="link"
      >
        <span class="icon">📡</span>
        <span>Access point</span>
      </router-link>

      <router-link
        to="/nodos"
        class="link"
      >
        <span class="icon">🔌</span>
        <span>Nodos</span>
      </router-link>

      <router-link
        to="/herramienta"
        class="link"
      >
        <span class="icon">🧰</span>
        <span>Herramienta y materiales</span>
      </router-link>

    </nav>

  </div>

</template>

<script>
import { useAuroraCore } from "../core/aurora/composables/useAuroraCore";

export default {

  setup() {

    const {

      registerClick

    } = useAuroraCore();

    return {

      registerClick

    };

  }

};
</script>

<style>

/* ======================================
   SIDEBAR
====================================== */

.sidebar {

  width: 220px;

  height: 100vh;

  background: #020617;

  color: white;

  padding: 20px;

  display: flex;

  flex-direction: column;

  border-right: 1px solid #1e293b;

}

/* ======================================
   LOGO
====================================== */

.logo {

  margin-bottom: 30px;

  padding: 0;

  border: none;

  background: transparent;

  color: white;

  font-size: 18px;

  font-weight: bold;

  text-align: left;

  cursor: pointer;

  user-select: none;

  font-family: inherit;

}

/* Sin efecto visual */

.logo:hover {

  color: white;

}

.logo:focus {

  outline: none;

}

.logo:active {

  transform: none;

}

/* ======================================
   NAVEGACIÓN
====================================== */

.link {

  display: block;

  padding: 10px;

  margin-bottom: 10px;

  color: #cbd5f5;

  text-decoration: none;

  border-radius: 6px;

}

.link:hover {

  background: #1e293b;

}

/* ======================================
   LINK ACTIVO
====================================== */

.router-link-exact-active {

  background: #334155;

  color: white;

}

</style>