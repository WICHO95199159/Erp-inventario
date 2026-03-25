<template>
  <div class="dashboard">

    <h1>📊 Dashboard</h1>

    <div class="cards">
      <div 
        class="card"
        v-for="(value, key) in counts"
        :key="key"
        @click="selectModule(key)"
        :class="{ active: selectedModule === key }"
      >
          <div class="icon">{{ getIcon(key) }}</div>
          <div class="title">{{ formatTitle(key) }}</div>
          <div class="value">{{ value }}</div>
      </div>
    </div>

    <!-- 🔥 GRÁFICAS DINÁMICAS -->
    <div class="charts" id="charts"></div>

  </div>
</template>

<script>
import api from "../services/api";
import Chart from "chart.js/auto"; // 🔥 ESTE ES CLAVE
import BarChart from "../components/BarChart.vue";

export default {
  components: { BarChart },

  data() {
    return {
      counts: {},
      selectedModule: null,
      chartsData: {},
      interval: null
    };
  },

  methods: {
    async load() {
      // 🔢 contadores
      const res = await api.get("/dashboard/counts");
      this.counts = res.data;

      // 📊 impresoras por tipo
      const imp = await api.get("/dashboard/impresoras-tipo");

      this.impresorasLabels = imp.data.map(i => i.tipo || "Sin tipo");
      this.impresorasData = imp.data.map(i => i.total);
    },

    async selectModule(module) {
      this.selectedModule = module;

      // ✅ PRIMERO defines endpoints
      const endpoints = {
        nodos: [
          "/dashboard/ports-location",
        ],
        computo: [
          "/dashboard/computo-marca",
          "/dashboard/computo-almacenamiento",
          "/dashboard/computo-so",
          "/dashboard/computo-procesador"
        ],
        impresoras: [
          "/dashboard/impresoras-tipo",
          "/dashboard/impresoras-marca",
          "/dashboard/impresoras-conexion"
        ],
        access_point: [
          "/dashboard/access_point-marca",
          "/dashboard/access_point-ssid"
        ],
        video: [
          "/dashboard/equipos_video-tipo",
          "/dashboard/equipos_video-marca"
        ],
        audio: [
          "/dashboard/equipos_audio-tipo",
          "/dashboard/equipos_audio-marca"
        ],
        herramientas: [
          "/dashboard/herramientas-tipo"
        ],
      };

      try {
        // ✅ DESPUÉS lo usas
        const urls = endpoints[module];

        if (!urls || urls.length === 0) {
          console.warn("No hay endpoints para:", module);
          return;
        }

        const responses = await Promise.all(
          urls.map(url => api.get(url))
        );

        this.chartsData = responses.map(r => r.data);

        this.$nextTick(() => {
          this.renderCharts();
        });

      } catch (error) {
        console.error("Error cargando gráficas:", error);
      }
    },

    renderCharts() {
      const container = document.getElementById("charts");

      if (!container) return;

      container.innerHTML = "";

      Object.keys(this.chartsData).forEach((key) => {

        const canvas = document.createElement("canvas");
        container.appendChild(canvas);

        new Chart(canvas, {
          type: "bar",
          data: {
            labels: this.chartsData[key].map(e => Object.values(e)[0]),
            datasets: [{
              label: key,
              data: this.chartsData[key].map(e => e.total)
            }]
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                labels: {
                  color: "white"
                }
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

      });
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

<style>

.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: auto;
}

/* 🔥 GRID DE CARDS */
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 15px;
  margin-bottom: 25px;
}

/* 🔥 CARD */
.card {
  background: #111827;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  border: 1px solid #374151;
  transition: all 0.3s ease;
  cursor: pointer;
}

.card:hover {
  transform: translateY(-5px) scale(1.02);
  border-color: #3b82f6;
}

.card.active {
  border: 1px solid #3b82f6;
  box-shadow: 0 0 15px rgba(59,130,246,0.6);
  transform: scale(1.05);
}

/* ICONO */
.icon {
  font-size: 28px;
  margin-bottom: 8px;
}

/* TITULO */
.title {
  font-size: 14px;
  color: #9ca3af;
  margin-bottom: 5px;
}

.value {
  font-size: 26px;
  font-weight: bold;
  color: #3b82f6;
}

/* 🔥 CONTENEDOR DE GRÁFICAS */
.charts {
  display: grid;
  gap: 20px;
  max-width: 700px;
  margin-top: 20px; /* 🔥 separación */
}

/* 🔥 CARD DE GRÁFICA */
.chart-card {
  background: #111827;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #374151;
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

/* 🔥 CONTROL DEL TAMAÑO DEL CANVAS */
canvas {
  max-height: 250px;
  width: 100% !important;
}

</style>