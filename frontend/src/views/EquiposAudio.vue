<template>
  <div>
    <EquiposAudioForm
        :editData="selected"
        :consultando="consultando"
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
        @consultar="consultarRow"
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
      consultando: false,
      search1: "",
      search2: ""
    };
  },

  methods: {
    editRow(row) {
        this.selected = row;
        this.consultando = false;
    },
    reload() {
        this.selected = null;
        this.consultando = false;
        this.$refs.table.load();
    },
    cancelEdit() {
        this.selected = null;
        this.consultando = false;
    },
    consultarRow(row) {
        this.selected = row;
        this.consultando = true;
    },
  }
};
</script>