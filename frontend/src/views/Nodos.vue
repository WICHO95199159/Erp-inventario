<template>
  <div>
    <PortsForm :editData="selected" @saved="reload" />
    <PortsTable
      @edit="editRow"
      @delete="deleteRow"
      ref="table"
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
      selected: null
    };
  },

  methods: {
    editRow(row) {
      this.selected = row;
    },
    reload() {
      this.selected = null;
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