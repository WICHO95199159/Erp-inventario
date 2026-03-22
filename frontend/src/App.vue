<template>
  <PortsForm :editData="selected" @saved="reload" />
  <PortsTable @edit="editRow" ref="table" />
</template>

<script>
import PortsTable from "./components/PortsTable.vue";
import PortsForm from "./components/PortsForm.vue";

export default {
  components: { PortsTable, PortsForm },

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
      this.$refs.table.load();
    }
  }
};
</script>