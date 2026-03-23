<template>
  <div class="sidebar">
    <h2 class="logo">📊 Inventario</h2>

    <nav>
      <router-link to="/" class="link">🏠 Dashboard</router-link>
      <router-link to="/nodos" class="link">🔌 Nodos</router-link>
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