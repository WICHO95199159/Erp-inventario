<template>
  <div>
    <PortsForm
      :editData="selected"
      :consultando="consultando"
      @saved="reload"
      @cancel="cancelForm"
    />

    <PortsTable
      ref="table"
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
      consultando: false
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