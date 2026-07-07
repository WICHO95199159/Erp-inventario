<template>
  <div class="page">

    <AccessPointForm
      :editData="selected"
      :consultando="consultando"
      @saved="save"
      @cancel="cancelForm"
    />

    <div class="search-group">

      <input
        v-model="search1"
        class="search"
        placeholder="Buscar por ubicación..."
      />

      <input
        v-model="search2"
        class="search"
        placeholder="Buscar general..."
      />

    </div>

    <AccessPointTable
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
import AccessPointForm from "../components/AccessPointForm.vue";
import AccessPointTable from "../components/AccessPointTable.vue";

export default {

  components: {
    AccessPointForm,
    AccessPointTable
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

        if (cleanData.id) {

          const id = cleanData.id;

          delete cleanData.id;

          await api.put(
            `/access-point/${id}`,
            cleanData
          );

        } else {

          await api.post(
            "/access-point",
            cleanData
          );

        }

        this.reload();

      }

      catch (error) {

        console.error(
          "Error al guardar:",
          error
        );

      }

    },

    // ======================================
    // ELIMINAR
    // ======================================

    async deleteRow(id) {

      try {

        await api.delete(
          `/access-point/${id}`
        );

        this.reload();

      }

      catch (error) {

        console.error(
          "Error al eliminar:",
          error
        );

      }

    }

  },

  mounted() {

    this.reload();

  }

};
</script>