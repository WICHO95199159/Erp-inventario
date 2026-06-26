<template>
  <div class="form-container">

    <!-- 🧠 TÍTULO DINÁMICO -->
    <div v-if="consultando" class="consult-title">
        🔍 Consultando access point...
    </div>

    <div v-else-if="form.id" class="edit-title">
        ✏️ Editando access point...
    </div>

    <div v-else class="new-title">
        ➕ Nuevo access point
    </div>

    <hr>
    <!-- 📦 GRID -->
    <div class="form-grid">

      <div class="field">
        <label>UBICACIÓN</label>
        <input v-model="form.ubicacion" :disabled="consultando" />
      </div>

      <div class="field">
        <label>MARCA</label>
        <input v-model="form.marca" :disabled="consultando" />
      </div>

      <div class="field">
        <label>MODELO</label>
        <input v-model="form.modelo" :disabled="consultando" />
      </div>

      <div class="field">
        <label>NO. DE SERIE</label>
        <input v-model="form.no_serie" :disabled="consultando" />
      </div>

      <div class="field">
        <label>IP</label>
        <input v-model="form.ip" :disabled="consultando" />
      </div>

      <div class="field">
        <label>SSID</label>
        <input v-model="form.ssid" :disabled="consultando" />
      </div>

      <div class="field">
        <label>CONTRASEÑA</label>
        <input v-model="form.contrasena" :disabled="consultando" />
      </div>

      <div class="field">
        <label>USER ADMIN</label>
        <input v-model="form.user_admin" :disabled="consultando" />
      </div>

      <div class="field">
        <label>PASSWORD ADMIN</label>
        <input v-model="form.password_admin" :disabled="consultando" />
      </div>

    </div>

    <!-- 🔘 BOTONES -->
    <div class="actions">
      <button
          v-if="!consultando"
          class="btn btn-save"
          @click="save">
          Guardar
      </button>
      <button
          class="btn btn-cancel"
          @click="cancel">
          Cancelar
      </button>
    </div>

  </div>
</template>

<script>
import api from "../services/api";

export default {
  props:[
      "editData",
      "consultando"
  ],

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
        contrasena: "",
        user_admin: "",
        password_admin: ""
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
  padding: 0px 0;
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

.field input:disabled{
    background:#1e293b;
    color:#93c5fd;
    opacity:1;
    border:1px solid #3b82f6;
    font-weight:bold;
    cursor:not-allowed;
}

.consult-title{
    margin-bottom:10px;
    font-weight:bold;
    color:#60a5fa;
}

.edit-title{
    margin-bottom:10px;
    font-weight:bold;
    color:#f59e0b;
}

.new-title{
    margin-bottom:10px;
    font-weight:bold;
    color:#a78bfa;
}
</style>