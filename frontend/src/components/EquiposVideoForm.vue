<template>
  <div class="form-container">

    <!-- ======================================
         TÍTULO
    ======================================= -->

    <div
      v-if="consultando"
      class="consult-title"
    >
      🔍 Consultando equipo de video...
    </div>

    <div
      v-else-if="form.id"
      class="form-title"
    >
      ✏️ Editando equipo de video...
    </div>

    <div
      v-else
      class="new-title"
    >
      ➕ Nuevo equipo de video
    </div>

    <hr>

    <!-- ======================================
         FORMULARIO
    ======================================= -->

    <div class="grid">

      <BaseInput
        label="VERIFICADO"
        v-model="form.verificado"
        :disabled="consultando"
        :error="errors.verificado"
      />

      <BaseInput
        label="EDIFICIO"
        v-model="form.edificio"
        :disabled="consultando"
        :error="errors.edificio"
      />

      <BaseInput
        label="PLANTA"
        v-model="form.planta"
        :disabled="consultando"
        :error="errors.planta"
      />

      <BaseInput
        label="SALÓN"
        type="number"
        v-model="form.salon"
        :disabled="consultando"
        :error="errors.salon"
      />

      <BaseInput
        label="TIPO"
        v-model="form.tipo"
        :disabled="consultando"
        :error="errors.tipo"
      />

      <BaseInput
        label="ESTATUS"
        v-model="form.estatus"
        :disabled="consultando"
        :error="errors.estatus"
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
        label="PULGADAS"
        type="number"
        v-model="form.pulgadas"
        :disabled="consultando"
        :error="errors.pulgadas"
      />

      <BaseInput
        label="EQUIPO DE CÓMPUTO"
        v-model="form.equipo_computo"
        :disabled="consultando"
        :error="errors.equipo_computo"
      />

      <BaseInput
        label="CONTROL"
        v-model="form.control"
        :disabled="consultando"
        :error="errors.control"
      />

      <BaseInput
        label="FUNCIONAL"
        v-model="form.funcional"
        :disabled="consultando"
        :error="errors.funcional"
      />

      <BaseInput
        label="NOTAS"
        type="textarea"
        v-model="form.notas"
        :disabled="consultando"
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

        verificado: "",
        edificio: "",
        planta: "",
        salon: "",
        tipo: "",
        estatus: "",
        marca: "",
        modelo: "",
        no_serie: "",
        pulgadas: "",
        equipo_computo: "",
        control: "",
        funcional: "",
        notas: "",

        cantidad: 1

      };

    },

    // ======================================
    // VALIDACIÓN
    // ======================================

    validateForm() {

      this.errors = {};

      const requiredFields = {

        verificado: "VERIFICADO",
        edificio: "EDIFICIO",
        planta: "PLANTA",
        salon: "SALÓN",
        tipo: "TIPO",
        estatus: "ESTATUS",
        marca: "MARCA",
        modelo: "MODELO",
        no_serie: "NO. DE SERIE",
        pulgadas: "PULGADAS",
        equipo_computo: "EQUIPO DE CÓMPUTO",
        control: "CONTROL",
        funcional: "FUNCIONAL"

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