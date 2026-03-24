<template>
  <div class="form-container">

    <!-- 🧠 TÍTULO DINÁMICO -->
    <div class="form-title">
      <span v-if="form.id">✏️ Editando access point...</span>
      <span v-else>➕ Nuevo access point</span>
    </div>

    <!-- 📦 GRID -->
    <div class="form-grid">

      <div class="field">
        <label>UBICACIÓN</label>
        <input v-model="form.ubicacion" />
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
        <label>IP</label>
        <input v-model="form.ip" />
      </div>

      <div class="field">
        <label>SSID</label>
        <input v-model="form.ssid" />
      </div>

      <div class="field">
        <label>CONTRASEÑA</label>
        <input v-model="form.contrasena" />
      </div>

    </div>

    <!-- 🔘 BOTONES -->
    <div class="actions">
      <button class="btn-save" @click="save">Guardar</button>
      <button class="btn-cancel" @click="cancel">Cancelar</button>
    </div>

  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: ["editData"],

  data() {
    return {
      form: this.getEmptyForm()
    };
  },

  watch: {
    editData: {
      immediate: true,
      handler(newVal) {
        if (newVal) {
          this.form = { ...newVal };
        } else {
          this.resetForm();
        }
      }
    }
  },

  methods: {
    // 🧼 FORM VACÍO
    getEmptyForm() {
      return {
        id: null,
        ubicacion: "",
        marca: "",
        modelo: "",
        no_serie: "",
        ip: "",
        ssid: "",
        contrasena: ""
      };
    },

    // 🧼 RESET
    resetForm() {
      this.form = this.getEmptyForm();
    },

    // 💾 GUARDAR (CREATE / UPDATE)
    async save() {
    const data = { ...this.form };

    if (data.id) {
        const id = data.id;
        delete data.id; // 🔥 ESTA ES LA CLAVE

        await api.put(`/access-point/${id}`, data);
    } else {
        await api.post("/access-point", data);
    }

    this.$emit("saved");
    this.resetForm();
    },

    // 🚫 CANCELAR
    cancel() {
      this.resetForm();
      this.$emit("cancel");
    }
  }
};
</script>

<style scoped>
.form-container {
  padding: 10px 0;
}

/* 🧠 TÍTULO */
.form-title {
  font-size: 18px;
  margin-bottom: 10px;
}

/* 📦 GRID */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

/* 🔤 CAMPOS */
.field {
  display: flex;
  flex-direction: column;
}

.field label {
  font-size: 12px;
  margin-bottom: 4px;
  color: #ccc;
}

.field input {
  padding: 6px;
  border-radius: 6px;
  border: none;
  background: #eee;
}

/* 🔘 BOTONES */
.actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
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