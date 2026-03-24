<template>
  <div>
    <EquiposVideoForm
      :editData="selected"
      @saved="reload"
      @cancelEdit="cancelEdit"
    />

    <input v-model="search" placeholder="Buscar..." class="search" />

    <EquiposVideoTable
      ref="table"
      :search="search"
      @edit="editRow"
    />
  </div>
</template>

<script>
import EquiposVideoForm from "../components/EquiposVideoForm.vue";
import EquiposVideoTable from "../components/EquiposVideoTable.vue";

export default {
  components: { EquiposVideoForm, EquiposVideoTable },

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

<style>
.search {
  margin: 15px 0;
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: #eee;
  width: 300px;
}
</style>