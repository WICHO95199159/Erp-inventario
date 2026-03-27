<template>
  <div>

    <ComputoForm
      :editData="selected"
      @saved="save"
      @cancel="selected = null"
    />

    <input v-model="search1" placeholder="Buscar por edificio..." class="search" />
    <input v-model="search2" placeholder="Buscar general..." class="search" />

    <ComputoTable
      ref="table"
      :search1="search1"
      :search2="search2"
      @edit="editRow"
    />

  </div>
</template>

<script>
import api from "../services/api";
import ComputoForm from "../components/ComputoForm.vue";
import ComputoTable from "../components/ComputoTable.vue";

export default {
  components: {
    ComputoForm,
    ComputoTable
  },

  data() {
    return {
      equipos: [],
      selected: null,

      // 🔍 FILTROS CRUZADOS
      search1: "",
      search2: ""
    };
  },

  methods: {
    // 🔥 CARGAR DATOS
    async load() {
      const res = await api.get("/equipos");
      this.equipos = res.data;
    },

    // ✏️ EDITAR
    editRow(row) {
      this.selected = row;
    },

    // 💾 GUARDAR (CREATE / UPDATE)
    async save(data) {
      try {
        if (data.id) {
          const id = data.id;
          delete data.id;
          await api.put(`/equipos/${id}`, data);
        } else {
          await api.post("/equipos", data);
        }

        this.selected = null;

        // 🔥 IMPORTANTE: refrescar tabla correctamente
        this.$refs.table.load();

      } catch (error) {
        console.error("🔥 ERROR AL GUARDAR:", error);
      }
    },

    // ❌ ELIMINAR
    async deleteRow(id) {
      await api.delete(`/equipos/${id}`);
      this.$refs.table.load();
    },

    // 🚫 CANCELAR EDICIÓN
    cancelEdit() {
      this.selected = null;
    }
  },

  mounted() {
    this.load();
  }
};
</script>