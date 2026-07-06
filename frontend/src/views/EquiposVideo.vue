<template>
  <div class="page">

    <EquiposVideoForm
      :editData="selected"
      :consultando="consultando"
      @saved="save"
      @cancel="cancelEdit"
    />

    <input
      v-model="search1"
      placeholder="Filtrar por edificio..."
      class="search"
    />

    <input
      v-model="search2"
      placeholder="Filtrar general..."
      class="search"
    />

    <EquiposVideoTable
      ref="table"
      :search1="search1"
      :search2="search2"
      @consultar="consultarRow"
      @edit="editRow"
    />

  </div>
</template>

<script>
import api from "../services/api";
import EquiposVideoForm from "../components/EquiposVideoForm.vue";
import EquiposVideoTable from "../components/EquiposVideoTable.vue";

export default {
  components: { EquiposVideoForm, EquiposVideoTable },

  data() {
    return {
      selected: null,
      consultando: false,
      search1: "",
      search2: ""
    };
  },

  methods: {
    editRow(row) {
        this.selected = row;
        this.consultando = false;
    },

    consultarRow(row) {
        this.selected = row;
        this.consultando = true;
    },

    reload() {

        this.selected = null;

        this.consultando = false;

        this.$refs.table.load();

    },

    cancelEdit() {

        this.selected = null;

        this.consultando = false;

    },

    async save(data) {
        try {
          let cleanData = { ...data };

          const cantidad = Math.max(1, parseInt(cleanData.cantidad) || 1);
          delete cleanData.cantidad;

          if (cleanData.id) {

            const id = cleanData.id;
            delete cleanData.id;

            await api.put(`/equipos-video/${id}`, cleanData);

          } else {

            const requests = [];

            for (let i = 0; i < cantidad; i++) {
              requests.push(api.post("/equipos-video", { ...cleanData }));
            }

            await Promise.all(requests);

          }

          this.reload();

        } catch (error) {

          console.error("ERROR AL GUARDAR:", error);

        }
      },

      mounted() {

          this.$refs?.table?.load();

      }
  }
};
</script>

<style>
.search {
  margin: 15px 0;
  margin-left: 5px;
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: #eee;
  width: 300px;
}
</style>