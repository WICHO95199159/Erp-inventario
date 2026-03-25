<template>
  <canvas ref="chart"></canvas>
</template>

<script>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export default {
  props: ["labels", "data", "title"],

  mounted() {
    this.renderChart();
  },

  watch: {
    data() {
      this.renderChart();
    }
  },

  methods: {
    renderChart() {
      if (this.chart) {
        this.chart.destroy();
      }

      this.chart = new Chart(this.$refs.chart, {
        type: "bar",
        data: {
          labels: this.labels,
          datasets: [
            {
              label: this.title,
              data: this.data
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { display: false }
          }
        }
      });
    }
  }
};
</script>