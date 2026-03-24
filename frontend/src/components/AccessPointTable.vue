<template>
  <div>

    <!-- 🔎 BUSCADOR (FUERA DE LA TABLA) -->
    <input
      v-model="search"
      placeholder="Buscar..."
      class="search"
    />

    <!-- 📦 CONTENEDOR -->
    <div class="table-container">

      <table>
        <thead>
          <tr>
            <th>ACCIONES</th>

            <th @click="sort('ubicacion')">UBICACIÓN</th>
            <th @click="sort('marca')">MARCA</th>
            <th @click="sort('modelo')">MODELO</th>
            <th @click="sort('no_serie')">NO. DE SERIE</th>
            <th @click="sort('ip')">IP</th>
            <th @click="sort('ssid')">SSID</th>
            <th @click="sort('contrasena')">CONTRASEÑA</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in filteredData" :key="row.id">

            <!-- 🔘 ACCIONES -->
            <td>
              <button @click="$emit('edit', row)" class="btn-edit">
                Editar
              </button>

              <button @click="confirmDelete(row)" class="btn-delete">
                Eliminar
              </button>
            </td>

            <td>{{ row.ubicacion }}</td>
            <td>{{ row.marca }}</td>
            <td>{{ row.modelo }}</td>
            <td>{{ row.no_serie }}</td>
            <td>{{ row.ip }}</td>
            <td>{{ row.ssid }}</td>
            <td>{{ row.contrasena }}</td>

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
    // 🔃 ORDENAR
    sort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc;
      } else {
        this.sortKey = key;
        this.sortAsc = true;
      }
    },

    // ❌ CONFIRMAR ELIMINACIÓN
    confirmDelete(row) {
      const nombre = row.ubicacion || row.ssid || "el access point";

      const ok = confirm(`¿Seguro que quieres eliminar ${nombre}?`);

      if (ok) {
        this.$emit("delete", row.id);
      }
    }
  },

  computed: {
    filteredData() {
      let result = this.data || [];

      // 🔎 FILTRO
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

/* 🔎 SEARCH */
.search {
  margin-bottom: 10px;
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: #eee;
  width: 250px;
}

/* 📦 CONTENEDOR */
.table-container {
  overflow-x: auto;
  max-width: 100%;
}

/* 📊 TABLA */
table {
  width: 100%;
  min-width: 700px;
  border-collapse: collapse;
}

/* 🧠 HEADER */
thead {
  background: #3a4a5a;
}

th {
  padding: 10px;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
}

/* 📄 FILAS */
td {
  padding: 8px;
  border-top: 1px solid #444;
  white-space: nowrap;
}

td, th {
  max-width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* 🔘 BOTONES */
.btn-edit {
  background: #2d7ef7;
  color: white;
  border: none;
  padding: 4px 8px;
  margin-right: 5px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-delete {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 5px;
  cursor: pointer;
}

</style>