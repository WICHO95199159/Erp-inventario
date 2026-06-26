<template>
  <div>
    <!-- 📊 CONTENEDOR SOLO PARA TABLA -->
    <div class="table-container">

      <table>
        <thead>
          <tr>
            <th>CANTIDAD</th>
            <th>ACCIONES</th>
            <th @click="sort('verificado')">VERIFICADO</th>
            <th @click="sort('edificio')">EDIFICIO</th>
            <th @click="sort('planta')">PLANTA</th>
            <th @click="sort('salon')">SALÓN</th>
            <th @click="sort('tipo')">TIPO</th>
            <th @click="sort('estatus')">ESTATUS</th>
            <th @click="sort('nombre')">NOMBRE</th>
            <th @click="sort('marca')">MARCA</th>
            <th @click="sort('modelo')">MODELO</th>
            <th @click="sort('no_serie')">NO. DE SERIE</th>
            <th @click="sort('mac')">MAC</th>
            <th @click="sort('procesador')">PROCESADOR</th>
            <th @click="sort('detalle_procesador')">DETALLE DEL PROCESADOR</th>
            <th @click="sort('tipo_almacenamiento')">ALMACENAMIENTO</th>
            <th @click="sort('almacenamiento')">ALMACENAMIENTO (GB)</th>
            <th @click="sort('ram')">RAM</th>
            <th @click="sort('sistema_operativo')">SISTEMA OPERATIVO</th>
            <th @click="sort('detalle_so')">DETALLE DEL SO</th>
            <th @click="sort('ip')">DIRECCIÓN IP</th>
            <th @click="sort('rust_id')">RUST ID</th>
            <th @click="sort('fecha_mtto')">FECHA MTTO</th>
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
                @click="deleteRow(row.id)">
                Eliminar
              </button>

            </td>
            <td>{{ row.verificado }}</td>
            <td>{{ row.edificio }}</td>
            <td>{{ row.planta }}</td>
            <td>{{ row.salon }}</td>
            <td>{{ row.tipo }}</td>
            <td>{{ row.estatus }}</td>
            <td>{{ row.nombre }}</td>
            <td>{{ row.marca }}</td>
            <td>{{ row.modelo }}</td>
            <td>{{ row.no_serie }}</td>
            <td>{{ row.mac }}</td>
            <td>{{ row.procesador }}</td>
            <td>{{ row.detalle_procesador }}</td>
            <td>{{ row.tipo_almacenamiento }}</td>
            <td>{{ row.almacenamiento }}</td>
            <td>{{ row.ram }}</td>
            <td>{{ row.sistema_operativo }}</td>
            <td>{{ row.detalle_so }}</td>
            <td>{{ row.ip }}</td>
            <td>{{ row.rust_id }}</td>
            <td>{{ row.fecha_mtto }}</td>

          </tr>
        </tbody>
      </table>

    </div>
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
      const res = await api.get("/equipos");
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

    async deleteRow(id) {
      const ok = confirm("¿Eliminar registro?");
      if (!ok) return;

      await api.delete(`/equipos/${id}`);
      this.load();
    }
  },

  computed: {
    filteredData() {
      let result = this.data;

      // 🔍 FILTRO 1 (ej: edificio)
      if (this.search1) {
        result = result.filter(e =>
          Object.values(e)
            .join(" ")
            .toLowerCase()
            .includes(this.search1.toLowerCase())
        );
      }

      // 🔍 FILTRO 2 (ej: tipo / nombre)
      if (this.search2) {
        result = result.filter(e =>
          Object.values(e)
            .join(" ")
            .toLowerCase()
            .includes(this.search2.toLowerCase())
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
  },

  mounted() {
    this.load();
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