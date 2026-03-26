<template>
  <div class="form-container">
    <div class="title">
      {{ form.id ? "✏️ Editando equipo de audio..." : "➕ Nuevo equipo de audio" }}
    </div>
    <hr>
    <div class="grid">
      <div class="field">
        <label>EDIFICIO</label>
        <input v-model="form.edificio" />
      </div>

      <div class="field">
        <label>SALÓN</label>
        <input v-model="form.salon" />
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" />
      </div>

      <div class="field">
        <label>MARCA</label>
        <input v-model="form.marca" />
      </div>

      <div class="field">
        <label>MODELO</label>
        <input v-model="form.modelo" />
      </div>

      <div class="field">
        <label>NO. DE SERIE</label>
        <input v-model="form.no_serie" />
      </div>
    </div>

    <div class="actions">
      <button @click="save" class="btn-save">Guardar</button>
      <button @click="cancel" class="btn-cancel">Cancelar</button>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: ["editData"],

  data() {
    return {
      form: {
        edificio: "",
        salon: "",
        tipo: "",
        marca: "",
        modelo: "",
        no_serie: ""
      }
    };
  },

  watch: {
    editData: {
      immediate: true,
      handler(val) {
        if (val) this.form = { ...val };
      }
    }
  },

  methods: {
    async save() {
      const data = { ...this.form };

      if (data.id) {
        const id = data.id;
        delete data.id;

        await api.put(`/equipos-audio/${id}`, data);
      } else {
        await api.post("/equipos-audio", data);
      }

      this.$emit("saved");
      this.resetForm();
    },

    cancel() {
      this.resetForm();
      this.$emit("cancelEdit");
    },

    resetForm() {
      this.form = {
        ubicacion: "",
        tipo: "",
        marca: "",
        modelo: "",
        no_serie: ""
      };
    }
  }
};
</script>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
}
.field {
  display: flex;
  flex-direction: column;
}
.actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}
</style>