<template>
  <div class="page">

    <PortsForm
      :editData="selected"
      :consultando="consultando"
      @saved="reload"
      @cancel="cancelForm"
    />

    <input
      v-model="search"
      class="search"
      placeholder="Buscar..."
    />

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
import PortsForm from "../components/PortsForm.vue";
import PortsTable from "../components/PortsTable.vue";
import api from "../services/api";

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
    editRow(row) {
        console.log("EDITAR");

        this.selected = row;
        this.consultando = false;
    },

    consultarRow(row) {
        console.log("CONSULTAR");

        this.selected = row;
        this.consultando = true;
    },

    cancelForm() {
      this.selected = null;
      this.consultando = false;
    },

    reload() {
      this.selected = null;
      this.consultando = false;
      this.$refs.table.load();
    },
    async deleteRow(id) {
      try {
        await api.delete(`/ports/${id}`);
        this.reload();
      } catch (error) {
        console.error(error);
      }
    },
  }
};
</script>