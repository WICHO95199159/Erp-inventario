<template>
  <div class="page">

    <ComputoForm
      :editData="selected"
      :consultando="consultando"
      @saved="save"
      @cancel="cancelForm"
    />

    <div class="search-group">

      <input
        v-model="search1"
        class="search"
        placeholder="Buscar por edificio..."
      />

      <input
        v-model="search2"
        class="search"
        placeholder="Buscar general..."
      />

    </div>

    <ComputoTable
      ref="table"
      :search1="search1"
      :search2="search2"
      @edit="editRow"
      @consultar="consultarRow"
      @delete="deleteRow"
    />

  </div>
</template>

<script>
import api from "../services/api";
import ComputoForm from "../components/ComputoForm.vue";
import ComputoTable from "../components/ComputoTable.vue";

export default {

  components: {
    ComputoForm,
    ComputoTable
  },

  data() {
    return {
      selected: null,
      consultando: false,
      search1: "",
      search2: ""
    };
  },

  methods: {

    // ======================================
    // RECARGAR
    // ======================================

    reload() {

      this.selected = null;
      this.consultando = false;

      this.$refs.table.load();

    },

    // ======================================
    // EDITAR
    // ======================================

    editRow(row) {

      this.selected = row;
      this.consultando = false;

    },

    // ======================================
    // CONSULTAR
    // ======================================

    consultarRow(row) {

      this.selected = row;
      this.consultando = true;

    },

    // ======================================
    // CANCELAR
    // ======================================

    cancelForm() {

      this.selected = null;
      this.consultando = false;

    },

    // ======================================
    // GUARDAR
    // ======================================

    async save(data) {

      try {

        const cleanData = { ...data };

        const cantidad = Math.max(
          1,
          parseInt(cleanData.cantidad) || 1
        );

        delete cleanData.cantidad;

        if (cleanData.id) {

          const id = cleanData.id;

          delete cleanData.id;

          await api.put(`/equipos/${id}`, cleanData);

        } else {

          const requests = [];

          for (let i = 0; i < cantidad; i++) {

            requests.push(
              api.post("/equipos", {
                ...cleanData
              })
            );

          }

          await Promise.all(requests);

        }

        this.reload();

      }

      catch (error) {

        console.error("Error al guardar:", error);

      }

    },

    // ======================================
    // ELIMINAR
    // ======================================

    async deleteRow(id) {

      try {

        await api.delete(`/equipos/${id}`);

        this.reload();

      }

      catch (error) {

        console.error("Error al eliminar:", error);

      }

    }

  },

  mounted() {

    this.reload();

  }

};
</script>