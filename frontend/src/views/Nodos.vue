<template>
  <div>
    <PortsForm :editData="selected" @saved="reload" />
    <PortsTable @edit="editRow" ref="table" />
  </div>
</template>

<script>
import PortsForm from "../components/PortsForm.vue";
import PortsTable from "../components/PortsTable.vue";

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
    }
  }
};
</script>