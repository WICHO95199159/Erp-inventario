<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>CANTIDAD</th>
          <th>ACCIONES</th>
          <th @click="sort('edificio')">EDIFICIO</th>
          <th @click="sort('salon')">SALÓN</th>
          <th @click="sort('tipo')">TIPO</th>
          <th @click="sort('marca')">MARCA</th>
          <th @click="sort('modelo')">MODELO</th>
          <th @click="sort('no_serie')">NO. DE SERIE</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, index) in filteredData" :key="row.id">

          <!-- 🔢 NUMERACIÓN -->
          <td>{{ index + 1 }}</td>

          <td>
            <button @click="$emit('edit', row)" class="btn-edit">Editar</button>
            <button @click="confirmDelete(row)" class="btn-delete">Eliminar</button>
          </td>

          <td>{{ row.edificio }}</td>
          <td>{{ row.salon }}</td>
          <td>{{ row.tipo }}</td>
          <td>{{ row.marca }}</td>
          <td>{{ row.modelo }}</td>
          <td>{{ row.no_serie }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: ["search1", "search2"],

  data() {
    return {
      data: [],
      sortKey: "",
      sortAsc: true
    };
  },

  methods: {
    async load() {
      const res = await api.get("/equipos-audio");
      this.data = res.data;
    },

    sort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },

    confirmDelete(row) {
      const ok = confirm(`¿Eliminar ${row.modelo}?`);
      if (ok) this.deleteRow(row.id);
    },

    async deleteRow(id) {
      await api.delete(`/equipos-audio/${id}`);
      this.load();
    }
  },

  computed: {
    filteredData() {
      let result = this.data;

      // 🔍 FILTRO 1 → edificio
      if (this.search1) {
        const s1 = this.search1.toLowerCase();

        result = result.filter(e =>
          String(e.edificio || "")
            .toLowerCase()
            .includes(s1)
        );
      }

      // 🔍 FILTRO 2 → general
      if (this.search2) {
        const s2 = this.search2.toLowerCase();

        result = result.filter(e =>
          Object.values(e)
            .join(" ")
            .toLowerCase()
            .includes(s2)
        );
      }

      // 🔃 ORDEN (tu código, NO lo cambies)
      if (this.sortKey) {
        result = [...result].sort((a, b) => {
          const valA = a[this.sortKey] ?? "";
          const valB = b[this.sortKey] ?? "";

          const compare = String(valA).localeCompare(String(valB), undefined, {
            numeric: true,
            sensitivity: "base"
          });

          return this.sortAsc ? compare : -compare;
        });
      }

      return result;
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
.table-container {
  overflow-x: auto;
}
table {
  width: 100%;
}
</style>