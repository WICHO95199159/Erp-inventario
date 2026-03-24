<template>
  <div>

    <ComputoForm
      :editData="selected"
      @saved="save"
    />

    <ComputoTable
      :data="equipos"
      @edit="edit"
      @delete="deleteRow"
    />

  </div>
</template>

<script>
import ComputoForm from "../components/ComputoForm.vue";
import ComputoTable from "../components/ComputoTable.vue";
import api from "../services/api";

export default {
  components: { ComputoForm, ComputoTable },

  data() {
    return {
      equipos: [],
      selected: null
    };
  },

  methods: {
    async load() {
      const res = await api.get("/equipos");
      this.equipos = res.data;
    },

    async save(form) {
      // 🔥 CANCELAR
      if (!form) {
        this.selected = null;
        return;
      }

      // 🔥 EDITAR
      if (form.id) {
        await api.put(`/equipos/${form.id}`, form);
      } 
      // 🔥 CREAR
      else {
        await api.post("/equipos", form);
      }

      // 🔥 reset
      this.selected = null;

      // 🔥 recargar tabla
      await this.load();
    },

    edit(row) {
      // 🔥 CLAVE: CLONAR
      this.selected = { ...row };
    },

    async deleteRow(id) {
      await api.delete(`/equipos/${id}`);
      await this.load();
    }
  },

  mounted() {
    this.load();

    this.interval = setInterval(() => {
      this.load();
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>