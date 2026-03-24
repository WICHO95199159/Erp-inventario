<template>
  <div>
    <!-- 🧩 FORM -->
    <AccessPointForm
      :editData="selected"
      @saved="reload"
      @cancel="cancelEdit"
    />

    <!-- 🔎 SEARCH + TABLA -->
    <AccessPointTable
      :data="accessPoints"
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

  data() {
    return {
      accessPoints: [],
      selected: null,
      interval: null
    };
  },

  methods: {
    // 🔄 Cargar datos
    async load() {
      const res = await api.get("/access-point");
      this.accessPoints = res.data;
    },

    // 🔁 Recargar (después de guardar/eliminar)
    reload() {
      this.selected = null;
      this.load();
    },

    // ✏️ Editar
    editRow(row) {
      this.selected = { ...row };
    },

    // ❌ Eliminar
    async deleteRow(id) {
      await api.delete(`/access-point/${id}`);
      this.reload();
    },

    // 🚫 Cancelar edición
    cancelEdit() {
      this.selected = null;
    }
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