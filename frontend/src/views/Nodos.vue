<template>
  <div class="page">

    <PortsForm
      :editData="selected"
      :consultando="consultando"
      @saved="save"
      @cancel="cancelForm"
    />

    <div class="search-group">

      <input
        v-model="search"
        class="search"
        placeholder="Buscar..."
      />

    </div>

    <PortsTable
      ref="table"
      :search="search"
      @edit="editRow"
      @consultar="consultarRow"
      @delete="deleteRow"
    />

  </div>
</template>

<script>
import api from "../services/api";
import PortsForm from "../components/PortsForm.vue";
import PortsTable from "../components/PortsTable.vue";

export default {

  components: {
    PortsForm,
    PortsTable
  },

  data() {
    return {
      selected: null,
      consultando: false,
      search: ""
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

          await api.put(`/ports/${id}`, cleanData);

        } else {

          await api.post("/ports", cleanData);

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

        await api.delete(`/ports/${id}`);

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