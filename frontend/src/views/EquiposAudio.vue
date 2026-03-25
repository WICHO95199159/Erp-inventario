<template>
  <div>
    <EquiposAudioForm
      :editData="selected"
      @saved="reload"
      @cancelEdit="cancelEdit"
    />

    <!-- 🔍 BUSCADOR -->
    <input v-model="search" placeholder="Buscar..." class="search" />

    <EquiposAudioTable
      ref="table"
      :search="search"
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