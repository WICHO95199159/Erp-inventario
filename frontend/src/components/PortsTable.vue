<template>
  <div class="container">

    <div class="table-container table-height-large">
      <table class="table table-wide table-hover table-sticky">
        <thead>
          <tr>
            <th>CANTIDAD</th>
            <th>ACCIONES</th>
            <th @click="sort('location')">UBICACIÓN</th>
            <th @click="sort('rack')">RACK</th>
            <th @click="sort('device')">DISPOSITIVO</th>
            <th @click="sort('port_number')">PUERTO</th>
            <th @click="sort('patchpanel')">PATCH PANEL</th>
            <th @click="sort('port_number_pp')">PUERTO PP</th>
            <th @click="sort('location_node')">NODO FINAL</th>
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
            <td>{{ row.location }}</td>
            <td>{{ row.rack }}</td>
            <td>{{ row.device }}</td>
            <td>{{ row.port_number }}</td>
            <td>{{ row.patchpanel }}</td>
            <td>{{ row.port_number_pp }}</td>
            <td>{{ row.location_node }}</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: [
      "search"
  ],

  data() {
    return {
      ports: [],
      sortKey: "",
      sortAsc: true
    };
  },

  computed: {
    filteredData() {

      return this.ports

          .filter(port =>

              Object.values(port).some(value =>

                  String(value)
                      .toLowerCase()
                      .includes(this.search.toLowerCase())

              )

          )

          .sort((a,b)=>{

              if(!this.sortKey) return 0;

              const result=String(a[this.sortKey]??"")
                  .localeCompare(
                      String(b[this.sortKey]??""),
                      undefined,
                      {
                          numeric:true,
                          sensitivity:"base"
                      }
                  );

              return this.sortAsc ? result : -result;

          });

  }
  },

  methods: {
    async load() {
      const res = await api.get("/ports");
      this.ports = res.data;
    },

    sort(key) {
      if (this.sortKey === key) {
        this.sortAsc = !this.sortAsc; // 🔥 invierte
      } else {
        this.sortKey = key;
        this.sortAsc = true; // 🔥 reset a asc
      }
    },

    confirmDelete(row) {
      const nombre = row.device || row.location || "el puerto";

      const ok = confirm(`¿Seguro que quieres eliminar ${nombre}?`);

      if (ok) {
        this.$emit("delete", row.id);
      }
    },
  },

  mounted() {
    this.load();

    this.interval = setInterval(() => {
      if (!document.hidden) {
        this.load();
      }
    }, 5000);
  },

  beforeUnmount() {
      if (this.interval) {
          clearInterval(this.interval);
      }
  },
};
</script>

<style scoped>

/* Ajustes exclusivos de este componente */

</style>