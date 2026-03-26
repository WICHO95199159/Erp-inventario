<template>
  <div class="form-container">
    <div class="title">
      {{ form.id ? "✏️ Editando herramienta..." : "➕ Nueva herramienta" }}
    </div>
    <hr>
    <div class="grid">
      <div class="field">
        <label>UBICACIÓN 1</label>
        <input v-model="form.ubicacion1" />
      </div>

      <div class="field">
        <label>UBICACIÓN 2</label>
        <input v-model="form.ubicacion2" />
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" />
      </div>

      <div class="field">
        <label>DESCRIPCIÓN</label>
        <textarea v-model="form.descripcion"></textarea>
      </div>

      <div class="field">
        <label>NOTA</label>
        <textarea v-model="form.nota"></textarea>
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
        ubicacion1: "",
        ubicacion2: "",
        tipo: "",
        descripcion: "",
        nota: ""
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

        await api.put(`/herramientas/${id}`, data);
      } else {
        await api.post("/herramientas", data);
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
        ubicacion1: "",
        ubicacion2: "",
        tipo: "",
        descripcion: "",
        nota: ""
      };
    }
  }
};
</script>

<style scoped>

.form-container {
  margin-bottom: 20px;
}

.title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: bold;
}

/* 🔥 GRID PRINCIPAL */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 12px;
  align-items: start;
}

/* 📦 CADA CAMPO */
.field {
  display: flex;
  flex-direction: column;
}

/* 🏷️ LABEL */
.field label {
  font-size: 12px;
  margin-bottom: 4px;
  color: #ccc;
}

/* ✏️ INPUT Y TEXTAREA */
.field input,
.field textarea {
  padding: 8px;
  border-radius: 6px;
  border: none;
  outline: none;
  background: #e5e5e5;
  color: #000;
}

/* 🧾 TEXTAREA MÁS GRANDE */
.field textarea {
  min-height: 60px;
  resize: vertical;
}

/* 🔥 HACER DESCRIPCIÓN Y NOTA MÁS ANCHAS */
.field textarea {
  grid-column: span 2;
}

/* 🔘 BOTONES */
.actions {
  margin-top: 12px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-save {
  background: #3b82f6;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

.btn-cancel {
  background: #ef4444;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  cursor: pointer;
}

</style>