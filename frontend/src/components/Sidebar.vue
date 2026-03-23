<template>
  <div class="sidebar">
    <h2 class="logo">📊 Inventario</h2>

    <nav>
      <router-link to="/" class="link">
        <span class="icon">🏠</span>
        <span>Dashboard</span>
      </router-link>

      <router-link to="/nodos" class="link">
        <span class="icon">🔌</span>
        <span>Nodos</span>
      </router-link>

      <router-link to="/computo" class="link">
        <span class="icon">💻</span>
        <span>Cómputo</span>
      </router-link>

      <router-link to="/video" class="link">
        <span class="icon">📺</span>
        <span>Video</span>
      </router-link>

      <router-link to="/audio" class="link">
        <span class="icon">🔊</span>
        <span>Audio</span>
      </router-link>

      <router-link to="/herramienta" class="link">
        <span class="icon">🧰</span>
        <span>Herramienta</span>
      </router-link>
    </nav>
  </div>
</template>

<style>
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

.logo {
  margin-bottom: 30px;
  font-size: 18px;
}

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

/* 🔥 activo */
.router-link-exact-active {
  background: #334155;
  color: white;
}
</style>