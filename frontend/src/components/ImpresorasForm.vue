<template>
  <div class="form-container">

    <!-- ======================================
         TÍTULO
    ======================================= -->

    <div
      v-if="consultando"
      class="consult-title"
    >
      🔍 Consultando impresora...
    </div>

    <div
      v-else-if="form.id"
      class="form-title"
    >
      ✏️ Editando impresora...
    </div>

    <div
      v-else
      class="new-title"
    >
      ➕ Nueva impresora
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
        label="MAC"
        v-model="form.mac"
        :disabled="consultando"
        :error="errors.mac"
      />

      <BaseInput
        label="CONEXIÓN"
        v-model="form.conexion"
        :disabled="consultando"
        :error="errors.conexion"
      />

      <BaseInput
        label="TIPO"
        v-model="form.tipo"
        :disabled="consultando"
        :error="errors.tipo"
      />

      <BaseInput
        label="CONSUMIBLE"
        v-model="form.consumible"
        :disabled="consultando"
        :error="errors.consumible"
      />

      <BaseInput
        label="MODELO DE CONSUMIBLE"
        v-model="form.modelo_consumible"
        :disabled="consultando"
        :error="errors.modelo_consumible"
      />

      <BaseInput
        label="IP / NOMBRE"
        v-model="form.ip_nombre"
        :disabled="consultando"
        :error="errors.ip_nombre"
      />

      <BaseInput
        label="USUARIO"
        v-model="form.usuario"
        :disabled="consultando"
        :error="errors.usuario"
      />

      <BaseInput
        label="PIN"
        v-model="form.pin"
        :disabled="consultando"
        :error="errors.pin"
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

        }

        else {

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
        mac: "",
        conexion: "",
        tipo: "",
        consumible: "",
        modelo_consumible: "",
        ip_nombre: "",
        usuario: "",
        pin: ""

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
        mac: "MAC",
        conexion: "CONEXIÓN",
        tipo: "TIPO",
        consumible: "CONSUMIBLE",
        modelo_consumible: "MODELO DE CONSUMIBLE",
        ip_nombre: "IP / NOMBRE",
        usuario: "USUARIO",
        pin: "PIN"

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