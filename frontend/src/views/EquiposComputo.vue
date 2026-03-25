<template>
  <div>

    <ComputoForm
      :editData="selected"
      @saved="save"
      @cancel="selected = null"
    />

    <ComputoTable
      :data="equipos"
      @edit="editRow"
      @delete="deleteRow"
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
      selected: null
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
      if (data.id) {
        const id = data.id;
        delete data.id;

        await api.put(`/equipos/${id}`, data);
      } else {
        await api.post("/equipos", data);
      }

      this.selected = null;
      this.load();
    },

    // 🗑️ ELIMINAR
    async deleteRow(id) {
      await api.delete(`/equipos/${id}`);
      this.load();
    }
  },

  mounted() {
    this.load();
  }
};
</script>