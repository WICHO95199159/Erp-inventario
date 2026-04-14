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
      selected: null,
      search1: "",
      search2: ""
    };
  },

  methods: {
    // 🔄 RECARGAR TABLA
    reload() {
      this.selected = null;
      this.$refs.table.load();
    },

    // ✏️ EDITAR
    editRow(row) {
      this.selected = row;
    },

    // 💾 GUARDAR (CREATE / UPDATE)
    async save(data) {
      try {
        let cleanData = { ...data };

        const cantidad = Math.max(1, parseInt(cleanData.cantidad) || 1);
        delete cleanData.cantidad;

        if (cleanData.id) {
          const id = cleanData.id;
          delete cleanData.id;

          await api.put(`/equipos/${id}`, cleanData);
        } else {
          const requests = [];

          for (let i = 0; i < cantidad; i++) {
            requests.push(api.post("/equipos", { ...cleanData }));
          }

          await Promise.all(requests);
        }

        this.reload();

      } catch (error) {
        console.error("🔥 ERROR AL GUARDAR:", error);
      }
    },

    // 🗑 ELIMINAR
    async deleteRow(id) {
      await api.delete(`/equipos/${id}`);
      this.reload();
    }
  },

  mounted() {
    this.$refs?.table?.load();
  }
};
</script>