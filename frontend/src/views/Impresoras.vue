
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
      selected: null,
      interval: null
    };
  },

  methods: {
    // 🔄 CARGAR DATOS
    async load() {
      try {
        const res = await api.get("/impresoras");
        this.impresoras = res.data;
      } catch (err) {
        console.error("Error cargando impresoras:", err);
      }
    },

    // 💾 GUARDAR (CREATE / UPDATE)
    async save(form) {
      if (!form) return; // 🔥 evita error al cancelar

      try {
        if (form.id) {
          const id = form.id;
          delete form.id;

          await api.put(`/impresoras/${id}`, form);
        } else {
          await api.post("/impresoras", form);
        }

        this.selected = null;
        await this.load();
      } catch (err) {
        console.error("Error guardando:", err);
      }
    },

    // ✏️ EDITAR
    edit(row) {
      this.selected = { ...row }; // 🔥 clon
    },

    // 🗑️ ELIMINAR
    async deleteRow(id) {
      try {
        await api.delete(`/impresoras/${id}`);
        await this.load();
      } catch (err) {
        console.error("Error eliminando:", err);
      }
    },

    // ❌ CANCELAR (NUEVO)
    cancelEdit() {
      this.selected = null;
    }
  },

  mounted() {
    this.load();

    // 🔄 auto refresh cada 5s
    this.interval = setInterval(() => {
      this.load();
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

