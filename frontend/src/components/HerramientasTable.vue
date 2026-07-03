<template>
  <div class="table-wrapper">

    <div class="table-container table-height-medium">

        <table class="table table-wide table-hover table-sticky">
      <thead>
        <tr>
          <th>Cantidad</th>
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
        <tr v-for="(row, index) in filteredData" :key="row.id">
          
          <!-- 🔢 NUMERACIÓN -->
          <td>{{ index + 1 }}</td>

          <!-- ACCIONES -->
          <td>

              <button
                  class="btn btn-consult"
                  @click="$emit('consultar',row)">
                  Consultar
              </button>

              <button
                  class="btn btn-edit"
                  @click="$emit('edit',row)">
                  Editar
              </button>

              <button
                  class="btn btn-delete"
                  @click="confirmDelete(row)">
                  Eliminar
              </button>

          </td>

          <!-- DATOS -->
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
      sortAsc: true,
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