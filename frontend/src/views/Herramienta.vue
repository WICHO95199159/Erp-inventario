<template>
  <div>
    <HerramientasForm
      :editData="selected"
      @saved="reload"
      @cancelEdit="cancelEdit"
    />

    <input v-model="search" placeholder="Buscar..." class="search" />

    <HerramientasTable
      ref="table"
      :search="search"
      @edit="editRow"
    />
  </div>
</template>

<script>
import HerramientasForm from "../components/HerramientasForm.vue";
import HerramientasTable from "../components/HerramientasTable.vue";

export default {
  components: { HerramientasForm, HerramientasTable },

  data() {
    return {
      selected: null,
      search: ""
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
    cancelEdit() {
      this.selected = null;
    }
  }
};
</script>