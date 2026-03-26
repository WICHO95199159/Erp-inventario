<template>
  <div>

    <!-- 🔍 BUSCADOR FUERA -->
    <input
      v-model="search"
      placeholder="Buscar..."
      class="search"
    />

    <!-- 📊 CONTENEDOR SOLO PARA TABLA -->
    <div class="table-container">

      <table>
        <thead>
          <tr>
            <th>ACCIONES</th>
            <th @click="sort('edificio')">EDIFICIO</th>
            <th @click="sort('salon')">SALÓN</th>
            <th @click="sort('nombre')">NOMBRE</th>
            <th @click="sort('marca')">MARCA</th>
            <th @click="sort('modelo')">MODELO</th>
            <th @click="sort('no_serie')">NO. DE SERIE</th>
            <th @click="sort('mac')">MAC</th>
            <th @click="sort('procesador')">PROCESADOR</th>
            <th @click="sort('tipo_almacenamiento')">ALMACENAMIENTO</th>
            <th @click="sort('almacenamiento')">ALMACENAMIENTO (GB)</th>
            <th @click="sort('ram')">RAM</th>
            <th @click="sort('sistema_operativo')">SISTEMA OPERATIVO</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in filteredData" :key="row.id">

            <td>
              <button @click="$emit('edit', row)" class="btn-edit">
                Editar
              </button>
              <button @click="confirmDelete(row.id)" class="btn-delete">
                Eliminar
              </button>
            </td>
            <td>{{ row.edificio }}</td>
            <td>{{ row.salon }}</td>
            <td>{{ row.nombre }}</td>
            <td>{{ row.marca }}</td>
            <td>{{ row.modelo }}</td>
            <td>{{ row.no_serie }}</td>
            <td>{{ row.mac }}</td>
            <td>{{ row.procesador }}</td>
            <td>{{ row.tipo_almacenamiento }}</td>
            <td>{{ row.almacenamiento }}</td>
            <td>{{ row.ram }}</td>
            <td>{{ row.sistema_operativo }}</td>

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
      sortKey: "",      // 🔥 columna actual
      sortAsc: true     // 🔥 orden asc/desc
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

    confirmDelete(id) {
      const ok = confirm("¿Seguro que quieres eliminar este equipo?");

      if (ok) {
        this.$emit("delete", id);
      }
    }
  },
  
  computed: {
    filteredData() {
      let result = this.data;

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
          const valA = a[this.sortKey] || "";
          const valB = b[this.sortKey] || "";

          if (this.sortAsc) {
            return valA > valB ? 1 : -1;
          } else {
            return valA < valB ? 1 : -1;
          }
        });
      }

      return result;
    }
  }
};
</script>

<style scoped>

.table-container {
  width: 100%;
  overflow-x: auto;
  display: block;
}

/* 🔥 TABLA GRANDE (CLAVE DEL SCROLL) */
table {
  min-width: 1800px;
  width: max-content;
}

/* 🔥 HEADER FIJO */
thead th {
  position: sticky;
  top: 0;
  background: #334155;
  z-index: 2;
}

/* 🔥 CELDAS */
th, td {
  padding: 10px 14px;
  white-space: nowrap;
  font-size: 14px;
}

/* 🔥 HEADER TEXTO */
th {
  color: #e2e8f0;
  font-weight: 600;
  letter-spacing: 0.5px;
}

/* 🔥 FILAS */
tbody tr {
  border-bottom: 1px solid #1e293b;
  transition: background 0.2s;
}

/* 🔥 HOVER */
tr:hover {
  background: #4f7cac;;
}

/* 🔥 FILA SELECCIONADA (opcional si luego la usas) */
tbody tr.active {
  background: #3b82f6;
  color: white;
}

/* 🔥 BOTONES */
button {
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
}

.btn-edit {
  background: #3b82f6;
  color: white;
  margin-right: 6px;
}

.btn-delete {
  background: #ef4444;
  color: white;
}

/* 🔥 BUSCADOR */
.search {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 6px;
  border: none;
  width: 250px;
}

/* 🔥 SCROLL BONITO (tipo Railway) */
.table-container::-webkit-scrollbar {
  height: 8px;
  width: 8px;
}

.table-container::-webkit-scrollbar-track {
  background: #0f172a;
}

.table-container::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

.table-container::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}

</style>