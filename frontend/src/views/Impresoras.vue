<script>
import ImpresorasForm from "../components/ImpresorasForm.vue";
import ImpresorasTable from "../components/ImpresorasTable.vue";
import api from "../services/api";

export default {
  components: {
    ImpresorasForm,
    ImpresorasTable
  },

  data() {
    return {
      impresoras: [],
      selected: null
    };
  },

  methods: {
    // 🔹 cargar datos
    async load() {
      const res = await api.get("/impresoras");
      this.impresoras = res.data;
    },

    // 🔹 guardar (crear o editar)
    async save(form) {
      if (!form) {
        this.selected = null;
        return;
      }

      if (form.id) {
        // 🔥 editar
        await api.put(`/impresoras/${form.id}`, form);
      } else {
        // 🔥 crear
        await api.post("/impresoras", form);
      }

      this.selected = null;
      await this.load();
    },

    // 🔹 editar
    edit(row) {
      this.selected = { ...row }; // 🔥 importante clonar
    },

    // 🔹 eliminar
    async deleteRow(id) {
      await api.delete(`/impresoras/${id}`);
      await this.load();
    }
  },

  mounted() {
    this.load();
  }
};
</script>


<template>
  <div>

    <!-- 🔥 FORM -->
    <ImpresorasForm
      :key="selected ? selected.id : 'new'"
      :editData="selected"
      @saved="save"
    />

    <!-- 🔥 TABLE -->
    <ImpresorasTable
      :data="impresoras"
      @edit="edit"
      @delete="deleteRow"
    />

  </div>
</template>