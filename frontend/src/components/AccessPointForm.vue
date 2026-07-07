<template>
  <div class="form-container">

    <!-- ======================================
         TÍTULO
    ======================================= -->

    <div
      v-if="consultando"
      class="consult-title"
    >
      🔍 Consultando Access Point...
    </div>

    <div
      v-else-if="form.id"
      class="form-title"
    >
      ✏️ Editando Access Point...
    </div>

    <div
      v-else
      class="new-title"
    >
      ➕ Nuevo registro
    </div>

    <hr>

    <!-- ======================================
         FORMULARIO
    ======================================= -->

    <div class="grid">

      <BaseInput
        label="UBICACIÓN"
        v-model="form.ubicacion"
        :disabled="consultando"
        :error="errors.ubicacion"
      />

      <BaseInput
        label="MARCA"
        v-model="form.marca"
        :disabled="consultando"
        :error="errors.marca"
      />

      <BaseInput
        label="MODELO"
        v-model="form.modelo"
        :disabled="consultando"
        :error="errors.modelo"
      />

      <BaseInput
        label="NO. DE SERIE"
        v-model="form.no_serie"
        :disabled="consultando"
        :error="errors.no_serie"
      />

      <BaseInput
        label="IP"
        v-model="form.ip"
        :disabled="consultando"
        :error="errors.ip"
      />

      <BaseInput
        label="SSID"
        v-model="form.ssid"
        :disabled="consultando"
        :error="errors.ssid"
      />

      <BaseInput
        label="CONTRASEÑA"
        v-model="form.contrasena"
        :disabled="consultando"
        :error="errors.contrasena"
      />

      <BaseInput
        label="USUARIO ADMIN"
        v-model="form.user_admin"
        :disabled="consultando"
        :error="errors.user_admin"
      />

      <BaseInput
        label="PASSWORD ADMIN"
        v-model="form.password_admin"
        :disabled="consultando"
        :error="errors.password_admin"
      />

    </div>

    <!-- ======================================
         BOTONES
    ======================================= -->

    <div class="actions">

      <button
        v-if="!consultando"
        class="btn btn-save"
        @click="save"
      >
        Guardar
      </button>

      <button
        class="btn btn-cancel"
        @click="cancel"
      >
        Cancelar
      </button>

    </div>

  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {

  components: {
    BaseInput
  },

  props: {

    editData: {
      type: Object,
      default: null
    },

    consultando: {
      type: Boolean,
      default: false
    }

  },

  data() {

    return {

      form: this.getEmptyForm(),

      errors: {}

    };

  },

  watch: {

    editData: {

      immediate: true,

      handler(value) {

        if (value) {

          this.form = { ...value };

        } else {

          this.form = this.getEmptyForm();

        }

        this.errors = {};

      }

    }

  },

  methods: {

    // ======================================
    // FORMULARIO VACÍO
    // ======================================

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

    // ======================================
    // VALIDACIÓN
    // ======================================

    validateForm() {

      this.errors = {};

      const requiredFields = {

        ubicacion: "UBICACIÓN",
        marca: "MARCA",
        modelo: "MODELO",
        no_serie: "NO. DE SERIE",
        ip: "IP",
        ssid: "SSID",
        contrasena: "CONTRASEÑA",
        user_admin: "USUARIO ADMIN",
        password_admin: "PASSWORD ADMIN"

      };

      for (const key in requiredFields) {

        const value = this.form[key];

        if (

          value === null ||
          value === undefined ||
          String(value).trim() === ""

        ) {

          this.errors[key] = "Campo obligatorio";

        }

      }

      return Object.keys(this.errors).length === 0;

    },

    // ======================================
    // NORMALIZAR DATOS
    // ======================================

    normalizeData(data) {

      Object.keys(data).forEach(key => {

        if (typeof data[key] === "string") {

          data[key] = data[key]
            .trim()
            .toUpperCase();

        }

      });

      return data;

    },

    // ======================================
    // GUARDAR
    // ======================================

    async save() {

      if (!this.validateForm()) return;

      const data = this.normalizeData({

        ...this.form

      });

      this.errors = {};

      this.$emit("saved", data);

      this.form = this.getEmptyForm();

    },

    // ======================================
    // CANCELAR
    // ======================================

    cancel() {

      this.errors = {};

      this.form = this.getEmptyForm();

      this.$emit("cancel");

    }

  }

};
</script>