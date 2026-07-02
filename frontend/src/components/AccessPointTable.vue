<template>
  <div>

    <!-- 🔎 BUSCADOR (FUERA DE LA TABLA) -->
    <input
      v-model="search"
      placeholder="Buscar..."
      class="search"
    />

    <!-- 📦 CONTENEDOR -->
    <div class="table-container table-height-large">

      <table class="table table-wide table-hover table-sticky">
        <thead>
          <tr>
            <th>CANTIDAD</th>
            <th class="actions-col">ACCIONES</th>
            
            <th @click="sort('ubicacion')">UBICACIÓN</th>
            <th @click="sort('marca')">MARCA</th>
            <th @click="sort('modelo')">MODELO</th>
            <th @click="sort('no_serie')">NO. DE SERIE</th>
            <th @click="sort('ip')">IP</th>
            <th @click="sort('ssid')">SSID</th>
            <th @click="sort('contrasena')">CONTRASEÑA</th>
            <th @click="sort('user_admin')">USER ADMIN</th>
            <th @click="sort('password_admin')">PASSWORD ADMIN</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(row, index) in filteredData" :key="row.id">

            <!-- 🔢 NUMERACIÓN -->
            <td>{{ index + 1 }}</td>


            <!-- 🔘 ACCIONES -->
            <td class="actions-col">

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
            <td>{{ row.ip }}</td>
            <td>{{ row.ssid }}</td>
            <td>{{ row.contrasena }}</td>
            <td>{{ row.user_admin }}</td>
            <td>{{ row.password_admin }}</td>

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

/* Ajustes exclusivos de este componente */

</style>