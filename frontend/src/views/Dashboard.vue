<template>
  <div class="dashboard">

    <h1>📊 Dashboard</h1>

    <div class="cards">

      <div class="card" v-for="(value, key) in counts" :key="key">

        <div class="icon">{{ getIcon(key) }}</div>

        <div class="title">{{ formatTitle(key) }}</div>

        <div class="value">{{ value }}</div>

      </div>

    </div>

  </div>
</template>

<script>

import api from "../services/api";

export default {
  data() {
    return {
      counts: {}
    };
  },

  methods: {
    async load() {
      const res = await api.get("/dashboard/counts");
      this.counts = res.data;
    },

    formatTitle(key) {
      return {
        nodos: "Nodos",
        computo: "Cómputo",
        impresoras: "Impresoras",
        access_point: "Access Point",
        video: "Video",
        audio: "Audio",
        herramientas: "Herramientas"
      }[key];
    },

    // 🔥 ESTE FALTABA
    getIcon(key) {
      return {
        nodos: "🔌",
        computo: "💻",
        impresoras: "🖨️",
        access_point: "📡",
        video: "📺",
        audio: "🔊",
        herramientas: "🧰"
      }[key];
    }
  },

  mounted() {
    this.load();

    this.interval = setInterval(() => {
      this.load();
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};

</script>

<style scoped>
.dashboard {
  padding: 20px;
}

/* GRID */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
}

/* CARD */
.card {
  background: #111827;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid #374151;
  transition: 0.3s;
}

.card:hover {
  transform: translateY(-5px);
}

/* TITLE */
.title {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 10px;
}

/* VALUE */
.value {
  font-size: 28px;
  font-weight: bold;
  color: #3b82f6;
}

.icon {
  font-size: 30px;
  margin-bottom: 8px;
}
</style>