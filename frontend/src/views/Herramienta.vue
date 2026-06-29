<template>
  <div>
    <HerramientasForm
        :editData="selected"
        :consultando="consultando"
        @saved="reload"
        @cancelEdit="cancelEdit"
    />

    <input v-model="search" placeholder="Buscar..." class="search" />

    <HerramientasTable
        ref="table"
        :search="search"
        @consultar="consultarRow"
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
      search: "",
      consultando:false,
    };
  },

  methods: {
    editRow(row){
        this.selected=row;
        this.consultando=false;
    },
    reload(){
        this.selected=null;
        this.consultando=false;
        this.$refs.table.load();
    },

    cancelEdit(){
        this.selected=null;
        this.consultando=false;
    },
    consultarRow(row){
        this.selected=row;
        this.consultando=true;
    }
  }
};
</script>