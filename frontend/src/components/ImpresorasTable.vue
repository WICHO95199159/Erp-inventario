<template>
  <div>

    <!-- 🔍 SEARCH FUERA -->
    <input
      v-model="search"
      placeholder="Buscar..."
      class="search"
    />

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>CANTIDAD</th>
            <th>ACCIONES</th>
            <th @click="sort('ubicacion')">UBICACIÓN</th>
            <th @click="sort('marca')">MARCA</th>
            <th @click="sort('modelo')">MODELO</th>
            <th @click="sort('no_serie')">NO. SERIE</th>
            <th @click="sort('mac')">MAC</th>
            <th @click="sort('conexion')">CONEXIÓN</th>
            <th @click="sort('tipo')">TIPO</th>
            <th @click="sort('consumible')">CONSUMIBLE</th>
            <th @click="sort('modelo_consumible')">MODELO DE CONSUMIBLE</th>
            <th @click="sort('ip_nombre')">IP / NOMBRE</th>
            <th @click="sort('usuario')">USUARIO</th>
            <th @click="sort('pin')">PIN</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in filteredData" :key="row.id">

            <!-- 🔢 NUMERACIÓN -->
            <td>{{ index + 1 }}</td>

            <td>

            <button
              class="btn btn-consult"
              @click="$emit('consultar', row)">
              Consultar
            </button>

            <button
              class="btn btn-edit"
              @click="$emit('edit', row)">
              Editar
            </button>

            <button
              class="btn btn-delete"
              @click="confirmDelete(row)">
              Eliminar
            </button>

          </td>
            
            <td>{{ row.ubicacion }}</td>
            <td>{{ row.marca }}</td>
            <td>{{ row.modelo }}</td>
            <td>{{ row.no_serie }}</td>
            <td>{{ row.mac }}</td>
            <td>{{ row.conexion }}</td>
            <td>{{ row.tipo }}</td>
            <td>{{ row.consumible }}</td>
            <td>{{ row.modelo_consumible }}</td>
            <td>{{ row.ip_nombre }}</td>
            <td>{{ row.usuario }}</td>
            <td>{{ row.pin }}</td>
            
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>


<script>
export default {
  props: ["data"],

  data() {
    return {
      search: "",
      sortKey: "",
      sortAsc: true
    };
  },

  methods: {
    sort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },

    confirmDelete(row) {
      const nombre = row.marca || row.modelo || row.ubicacion || "la impresora";

      const ok = confirm(`¿Seguro que quieres eliminar ${nombre}?`);

      if (ok) {
        this.$emit("delete", row.id);
      }
    }
  },

  beforeUnmount() {
    clearInterval(this.interval);
  },

  computed: {
    filteredData() {
      let result = this.data || [];

      // 🔍 FILTRO
      if (this.search) {
        result = result.filter(e =>
          Object.values(e)
            .join(" ")
            .toLowerCase()
            .includes(this.search.toLowerCase())
        );
      }

      // 🔃 ORDENAMIENTO
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
  }
};
</script>


<style scoped>
.search {
  margin-bottom: 10px;
  padding: 8px;
  width: 250px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.table-container {
  width: 100%;
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  cursor: pointer;
  background: #334155;
  position: sticky;
  top: 0;
}

th, td {
  padding: 10px;
  white-space: nowrap;
}

tr:hover {
  background: #4f7cac;;
}

</style>