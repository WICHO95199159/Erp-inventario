<template>
  <div class="table-wrapper">

    <div class="table-container table-height-medium">

        <table class="table table-wide table-hover table-sticky">
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

