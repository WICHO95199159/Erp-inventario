<template>
  <div class="form-container">

    <!-- ======================================
         TÍTULO
    ======================================= -->

    <div
      v-if="consultando"
      class="consult-title"
    >
      🔍 Consultando herramienta...
    </div>

    <div
      v-else-if="form.id"
      class="form-title"
    >
      ✏️ Editando herramienta...
    </div>

    <div
      v-else
      class="new-title"
    >
      ➕ Nueva herramienta
    </div>

    <hr>

    <!-- ======================================
         FORMULARIO
    ======================================= -->

    <div class="grid">

      <BaseInput
        label="UBICACIÓN 1"
        v-model="form.ubicacion1"
        :disabled="consultando"
        :error="errors.ubicacion1"
      />

      <BaseInput
        label="UBICACIÓN 2"
        v-model="form.ubicacion2"
        :disabled="consultando"
        :error="errors.ubicacion2"
      />

      <BaseInput
        label="TIPO"
        v-model="form.tipo"
        :disabled="consultando"
        :error="errors.tipo"
      />

      <BaseInput
        label="NOMBRE"
        v-model="form.nombre"
        :disabled="consultando"
        :error="errors.nombre"
      />

      <BaseInput
        label="DESCRIPCIÓN"
        type="textarea"
        v-model="form.descripcion"
        :disabled="consultando"
        :error="errors.descripcion"
      />

      <BaseInput
        label="NOTA"
        type="textarea"
        v-model="form.nota"
        :disabled="consultando"
        :error="errors.nota"
      />

      <BaseInput
        v-if="!editData"
        label="CANTIDAD DE REGISTROS"
        type="number"
        v-model="form.cantidad"
        :disabled="consultando"
        :error="errors.cantidad"
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

        ubicacion1: "",
        ubicacion2: "",
        tipo: "",
        nombre: "",
        descripcion: "",
        nota: "",

        cantidad: 1

      };

    },

    // ======================================
    // VALIDACIÓN
    // ======================================

    validateForm() {

      this.errors = {};

      const requiredFields = {

        ubicacion1: "UBICACIÓN 1",
        ubicacion2: "UBICACIÓN 2",
        tipo: "TIPO",
        nombre: "NOMBRE"

      };

      if (!this.editData) {

        requiredFields.cantidad = "CANTIDAD DE REGISTROS";

      }

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