<template>
  <div class="table-container">
    <table>
      <thead>
        <tr>
          <th>ACCIONES</th>
          <th @click="sort('ubicacion1')">UBICACIÓN 1</th>
          <th @click="sort('ubicacion2')">UBICACIÓN 2</th>
          <th @click="sort('tipo')">TIPO</th>
          <th @click="sort('tipo')">NOMBRE</th>
          <th @click="sort('descripcion')">DESCRIPCIÓN</th>
          <th @click="sort('nota')">NOTA</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="row in filteredData" :key="row.id">
          <td>
            <button @click="$emit('edit', row)" class="btn-edit">Editar</button>
            <button @click="confirmDelete(row)" class="btn-delete">Eliminar</button>
          </td>

          <td>{{ row.ubicacion1 }}</td>
          <td>{{ row.ubicacion2 }}</td>
          <td>{{ row.tipo }}</td>
          <td>{{ row.nombre }}</td>
          <td>{{ row.descripcion }}</td>
          <td>{{ row.nota }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: ["search"],

  data() {
    return {
      data: [],
      sortKey: "",
      sortAsc: true
    };
  },

  methods: {
    async load() {
      const res = await api.get("/herramientas");
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
      const ok = confirm(`¿Eliminar herramienta ${row.tipo}?`);
      if (ok) this.deleteRow(row.id);
    },

    async deleteRow(id) {
      await api.delete(`/herramientas/${id}`);
      this.load();
    }
  },

  computed: {
    filteredData() {
      let result = this.data;

      if (this.search) {
        result = result.filter(e =>
          Object.values(e)
            .join(" ")
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      }

      if (this.sortKey) {
        result = [...result].sort((a, b) => {
          const valA = a[this.sortKey] ?? "";
          const valB = b[this.sortKey] ?? "";

          const compare = String(valA).localeCompare(String(valB));

          return this.sortAsc ? compare : -compare;
        });
      }

      return result;
    }
  },

  mounted() {
    this.load();
    this.interval = setInterval(() => this.load(), 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>