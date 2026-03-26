<template>
  <div class="form-container">
    <div class="title">
      {{ form.id ? "✏️ Editando equipo de video..." : "➕ Nuevo equipo de video" }}
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

      <div class="field">
        <label>PULGADAS</label>
        <input v-model="form.pulgadas" />
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
        no_serie: "",
        pulgadas: ""
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

        await api.put(`/equipos-video/${id}`, data);
      } else {
        await api.post("/equipos-video", data);
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
        edificio: "",
        salon: "",
        tipo: "",
        marca: "",
        modelo: "",
        no_serie: "",
        pulgadas: ""
      };
    }
  }
};
</script>

<style scoped>
.form-container {
  margin-bottom: 20px;
}

/* 🧠 TÍTULO */
.title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}

/* 📦 GRID */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  align-items: end;
}

/* 🧾 CAMPOS */
.field {
  display: flex;
  flex-direction: column;
}

.field label {
  font-size: 12px;
  margin-bottom: 3px;
}

.field input {
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: #eee;
}

/* 🔘 BOTONES */
.actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.btn-save {
  background: #2d7ef7;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancel {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
}
</style>