<template>
  <div class="form-container">

    <!-- 🧠 TÍTULO DINÁMICO -->
    <div v-if="consultando" class="consult-title">
        🔍 Consultando access point...
    </div>

    <div v-else-if="form.id" class="form-title">
        ✏️ Editando access point...
    </div>

    <div v-else class="new-title">
        ➕ Nuevo access point
    </div>

    <hr>
    <!-- 📦 GRID -->
    <div class="grid">

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
@import "../assets/styles/forms.css";
@import "../assets/styles/buttons.css";
</style>