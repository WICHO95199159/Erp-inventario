<template>
  <div class="dashboard">

    <!-- HEADER -->
    <h1 class="title">📊 Dashboard</h1>

    <!-- CARDS -->
    <div class="cards">
      <div
        v-for="(value, key) in counts"
        :key="key"
        class="card"
        :class="{ active: selectedModule === key }"
        @click="selectModule(key)"
      >
        <div class="icon">{{ getIcon(key) }}</div>
        <div class="title-card">{{ formatTitle(key) }}</div>
        <div class="value">{{ value }}</div>
      </div>
    </div>

    <!-- MENSAJE -->
    <div v-if="!selectedModule" class="empty">
      👇 Selecciona un módulo para ver las gráficas
    </div>

    <!-- GRÁFICAS -->
    <div v-else class="charts-container">
      <h2 class="module-title">
        {{ formatTitle(selectedModule) }}
      </h2>

      <div id="charts" class="charts"></div>
    </div>

  </div>
</template>

<script>
import api from "../services/api";
import Chart from "chart.js/auto";

export default {
  name: "Dashboard",

  data() {
    return {
      counts: {},
      selectedModule: null,
      chartsData: {},
      chartsInstances: [],
      interval: null,

      endpoints: {
        nodos: "/dashboard/nodos",
        computo: "/dashboard/computo",
        impresoras: "/dashboard/impresoras",
        access_point: "/dashboard/access-point",
        video: "/dashboard/video",
        audio: "/dashboard/audio",
        herramientas: "/dashboard/herramientas"
      }
    };
  },

  methods: {

    // =============================
    // CARGAR CONTADORES
    // =============================
    async loadCounts() {
      try {
        const res = await api.get("/dashboard/counts");
        this.counts = res.data;
      } catch (error) {
        console.error("Error cargando contadores:", error);
      }
    },

    // =============================
    // SELECCIONAR MÓDULO
    // =============================
    async selectModule(module) {
      this.selectedModule = module;

      try {
        const endpoint = this.endpoints[module];

        if (!endpoint) {
          console.warn("No hay endpoint para:", module);
          return;
        }

        const res = await api.get(endpoint);

        // 🔥 NORMALIZACIÓN (clave del éxito)
        if (Array.isArray(res.data)) {
          this.chartsData = {
            [module]: res.data
          };
        } else {
          this.chartsData = res.data;
        }

        this.$nextTick(() => {
          this.renderCharts();
        });

      } catch (error) {
        console.error("Error cargando módulo:", module, error);
      }
    },

    // =============================
    // LIMPIAR GRÁFICAS
    // =============================
    destroyCharts() {
      this.chartsInstances.forEach(chart => chart.destroy());
      this.chartsInstances = [];
    },

    // =============================
    // RENDER GRÁFICAS
    // =============================
    renderCharts() {
      const container = document.getElementById("charts");
      if (!container) return;

      this.destroyCharts();
      container.innerHTML = "";

      Object.keys(this.chartsData).forEach(key => {
        const dataset = this.chartsData[key];

        if (!Array.isArray(dataset) || dataset.length === 0) return;

        // 🔥 CONTENEDOR
        const wrapper = document.createElement("div");
        wrapper.className = "chart-box";

        const canvas = document.createElement("canvas");

        wrapper.appendChild(canvas);
        container.appendChild(wrapper);

        const chart = new Chart(canvas, {
          type: "bar",
          data: {
            labels: dataset.map(e => e.label),
            datasets: [
              {
                label: this.formatTitle(key),
                data: dataset.map(e => e.total),
                borderWidth: 1
              }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                labels: { color: "white" }
              }
            },
            scales: {
              x: {
                ticks: { color: "white" }
              },
              y: {
                ticks: { color: "white" }
              }
            }
          }
        });

        this.chartsInstances.push(chart);
      });
    },

    // =============================
    // TITULOS
    // =============================
    formatTitle(key) {
      const titles = {
        nodos: "Nodos",
        computo: "Cómputo",
        impresoras: "Impresoras",
        access_point: "Access Point",
        video: "Video",
        audio: "Audio",
        herramientas: "Herramientas"
      };
      return titles[key] || key;
    },

    // =============================
    // ICONOS
    // =============================
    getIcon(key) {
      const icons = {
        nodos: "🖧",
        computo: "💻",
        impresoras: "🖨️",
        access_point: "📡",
        video: "📺",
        audio: "🔊",
        herramientas: "🛠️"
      };
      return icons[key] || "📦";
    }

  },

  // =============================
  // CICLO DE VIDA
  // =============================
  mounted() {
    this.loadCounts();

    this.interval = setInterval(() => {
      this.loadCounts();
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
    this.destroyCharts();
  }
};
</script>

<style scoped>

.dashboard {
  padding: 20px;
  color: white;
}

.title {
  margin-bottom: 20px;
}

/* CARDS */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 15px;
}

.card {
  background: #25253a;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
}

.card:hover {
  transform: scale(1.05);
}

.card.active {
  border: 2px solid #4ea8ff;
}

.icon {
  font-size: 22px;
}

.title-card {
  margin-top: 5px;
}

.value {
  font-size: 20px;
  font-weight: bold;
}

/* MENSAJE */
.empty {
  margin-top: 30px;
  text-align: center;
  opacity: 0.7;
}

/* GRÁFICAS */
.charts-container {
  margin-top: 30px;
}

.module-title {
  margin-bottom: 10px;
}

/* 🔥 GRID DE GRÁFICAS */
.charts {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 15px;
}

/* 🔥 TARJETA DE GRÁFICA */
.chart-box {
  background: #1e1e2f;
  padding: 10px;
  border-radius: 10px;
  height: 250px;
}

.chart-box canvas {
  width: 100% !important;
  height: 100% !important;
}

</style>