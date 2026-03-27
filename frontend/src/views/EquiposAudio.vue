<template>
  <div>
    <EquiposAudioForm
      :editData="selected"
      @saved="reload"
      @cancelEdit="cancelEdit"
    />

    <!-- 🔍 BUSCADOR -->
    <input v-model="search1" placeholder="Filtrar por edificio..." class="search" />
    <input v-model="search2" placeholder="Filtrar general..." class="search" />

    <EquiposAudioTable
      ref="table"
      :search1="search1"
      :search2="search2"
      @edit="editRow"
    />
  </div>
</template>

<script>
import EquiposAudioForm from "../components/EquiposAudioForm.vue";
import EquiposAudioTable from "../components/EquiposAudioTable.vue";

export default {
  components: { EquiposAudioForm, EquiposAudioTable },

  data() {
    return {
      selected: null,
      search1: "",
      search2: ""
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