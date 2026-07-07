<template>
  <div class="form-container">

    <!-- ======================================
         TÍTULO
    ======================================= -->

    <div
      v-if="consultando"
      class="consult-title"
    >
      🔍 Consultando puerto...
    </div>

    <div
      v-else-if="form.id"
      class="form-title"
    >
      ✏️ Editando puerto...
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
        v-model="form.location"
        :disabled="consultando"
        :error="errors.location"
      />

      <BaseInput
        label="RACK"
        v-model="form.rack"
        :disabled="consultando"
        :error="errors.rack"
      />

      <BaseInput
        label="DISPOSITIVO"
        v-model="form.device"
        :disabled="consultando"
        :error="errors.device"
      />

      <BaseInput
        label="PUERTO"
        type="number"
        v-model="form.port_number"
        :disabled="consultando"
        :error="errors.port_number"
      />

      <BaseInput
        label="PATCH PANEL"
        v-model="form.patchpanel"
        :disabled="consultando"
        :error="errors.patchpanel"
      />

      <BaseInput
        label="PUERTO PP"
        type="number"
        v-model="form.port_number_pp"
        :disabled="consultando"
        :error="errors.port_number_pp"
      />

      <BaseInput
        label="NODO FINAL"
        v-model="form.location_node"
        :disabled="consultando"
        :error="errors.location_node"
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

        location: "",
        rack: "",
        device: "",
        port_number: "",
        patchpanel: "",
        port_number_pp: "",
        location_node: ""

      };

    },

    // ======================================
    // VALIDACIÓN
    // ======================================

    validateForm() {

      this.errors = {};

      const requiredFields = {

        location: "UBICACIÓN",
        rack: "RACK",
        device: "DISPOSITIVO",
        port_number: "PUERTO",
        patchpanel: "PATCH PANEL",
        port_number_pp: "PUERTO PP",
        location_node: "NODO FINAL"

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