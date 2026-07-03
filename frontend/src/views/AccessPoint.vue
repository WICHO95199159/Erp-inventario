<template>
  <div>
    <!-- 🧩 FORM -->
    <AccessPointForm
        :editData="selected"
        :consultando="consultando"
        @saved="reload"
        @cancel="cancelEdit"
    />

    <input
        v-model="search"
        class="search"
        placeholder="Buscar..."
    />

    <!-- 🔎 SEARCH + TABLA -->
    <AccessPointTable
        :data="accessPoints"
        :search="search"
        @consultar="consultarRow"
        @edit="editRow"
        @delete="deleteRow"
        ref="table"
    />
  </div>
</template>

<script>
import api from "../services/api";

import AccessPointForm from "../components/AccessPointForm.vue";
import AccessPointTable from "../components/AccessPointTable.vue";

export default {
  components: {
    AccessPointForm,
    AccessPointTable
  },

  data(){
      return{
          accessPoints:[],
          selected:null,
          consultando:false,
          interval:null,
          search: "",
      }
  },

  methods: {
    // 🔄 Cargar datos
    async load() {
      const res = await api.get("/access-point");
      this.accessPoints = res.data;
    },

    // 🔁 Recargar (después de guardar/eliminar)
    reload(){
        this.selected=null;
        this.consultando=false;
        this.load();
    },

    // ✏️ Editar
    editRow(row){
        this.selected={...row};
        this.consultando=false;
    },

    //Consultar
    consultarRow(row){
        this.selected={...row};
        this.consultando=true;
    },

    // ❌ Eliminar
    async deleteRow(id) {
      await api.delete(`/access-point/${id}`);
      this.reload();
    },

    // 🚫 Cancelar edición
    cancelEdit(){
        this.selected=null;
        this.consultando=false;
    },
  },

  mounted() {
    this.load();

    // 🔁 AUTO REFRESH cada 5 segundos
    this.interval = setInterval(() => {
      if (!document.hidden) {
        this.load();
      }
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>