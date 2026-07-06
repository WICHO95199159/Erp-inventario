<template>
  <div class="form-container">

    <!-- 🔥 TÍTULO DINÁMICO -->
    <div v-if="consultando" class="consult-title">
        🔍 Consultando equipo de cómputo...
    </div>

    <div v-else-if="form.id" class="form-title">
        ✏️ Editando equipo de cómputo...
    </div>

    <div v-else class="new-title">
        ➕ Nuevo registro
    </div>

    <hr>

    <!-- 🔥 GRID -->
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
          label="NOMBRE"
          v-model="form.nombre"
          :disabled="consultando"
          :error="errors.nombre"
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
          label="NO_SERIE"
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
          label="PROCESADOR"
          v-model="form.procesador"
          :disabled="consultando"
          :error="errors.procesador"
      />

      <BaseInput
          label="DETALLE DEL PROCESADOR"
          v-model="form.detalle_procesador"
          :disabled="consultando"
          :error="errors.detalle_procesador"
      />

      <BaseInput
          label="TIPO DE ALMACENAMIENTO"
          v-model="form.tipo_almacenamiento"
          :disabled="consultando"
          :error="errors.tipo_almacenamiento"
      />

      <BaseInput
          label="ALMACENAMIENTO"
          v-model="form.almacenamiento"
          type="number"
          :disabled="consultando"
          :error="errors.almacenamiento"
      />

      <BaseInput
          label="RAM"
          v-model="form.ram"
          type="number"
          :disabled="consultando"
          :error="errors.ram"
      />

      <BaseInput
          label="SISTEMA OPERATIVO"
          v-model="form.sistema_operativo"
          type="number"
          :disabled="consultando"
          :error="errors.sistema_operativo"
      />

      <BaseInput
          label="DETALLE DEL SO"
          v-model="form.detalle_so"
          :disabled="consultando"
          :error="errors.detalle_so"
      />

      <BaseInput
          label="IP"
          v-model="form.ip"
          :disabled="consultando"
          :error="errors.ip"
      />

      <BaseInput
          label="RUST ID"
          v-model="form.rust_id"
          type="number"
          :disabled="consultando"
          :error="errors.rust_id"
      />

      <BaseInput
          label="MANTENIMIENTO"
          v-model="form.fecha_mtto"
          type="number"
          :disabled="consultando"
          :error="errors.fecha_mtto"
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

    <!-- 🔥 BOTONES -->
    <div class="actions">
      <button v-if="!consultando" class="btn btn-save" @click="save"> Guardar </button>
      <button class="btn btn-cancel" @click="cancel">Cancelar</button>
    </div>

  </div>
</template>

<script>
import BaseInput from "./BaseInput.vue";

export default {

  components: {
    BaseInput
  },

  props: [
    "editData",
    "consultando"
  ],

  data() {
    return {
      form: this.getEmptyForm(),

      errors: {}

    };
  },

  watch: {
    editData: {
      immediate: true,
      handler(val) {
        if (val) {
          this.form = { ...val };
        } else {
          this.form = this.getEmptyForm();
        }
      }
    }
  },

  methods: {
    getEmptyForm() {
      return {
        id: null,
        verificado: "",
        edificio: "",
        planta: "",
        salon: "",
        tipo: "",
        estatus: "",
        nombre: "",
        marca: "",
        modelo: "",
        no_serie: "",
        mac: "",
        procesador: "",
        detalle_procesador: "",
        tipo_almacenamiento: "",
        almacenamiento: "",
        ram: "",
        sistema_operativo: "",
        detalle_so: "",
        ip: "",
        rust_id: "",
        fecha_mtto: "",
        cantidad: 1 // 🔥 SOLO FRONTEND
      };
    },

    validateForm() {

          this.errors = {};

          const requiredFields = {
              verificado: "VERIFICADO",
              edificio: "EDIFICIO",
              planta: "PLANTA",
              salon: "NO. SALÓN",
              tipo: "TIPO",
              estatus: "ESTATUS",
              nombre: "NOMBRE",
              marca: "MARCA",
              modelo: "MODELO",
              no_serie: "NO. DE SERIE",
              mac: "MAC",
              procesador: "PROCESADOR",
              detalle_procesador: "DETALLE DEL PROCESADOR",
              tipo_almacenamiento: "TIPO DE ALMACENAMIENTO",
              almacenamiento: "ALMACENAMIENTO (GB)",
              ram: "RAM",
              sistema_operativo: "SISTEMA OPERATIVO",
              detalle_so: "DETALLE DEL SO",
              ip: "IP",
              rust_id: "RUST ID",
              fecha_mtto: "MANTENIMIENTO"
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

    // 🔥 NORMALIZAR (MAYÚSCULAS)
    normalizeData(data) {
      Object.keys(data).forEach(key => {
        if (typeof data[key] === "string") {
          data[key] = data[key].toUpperCase().trim();
        }
      });
      return data;
    },

    async save() {

        if (!this.validateForm()) return;

        const data = this.normalizeData({ ...this.form });

        this.errors = {};

        this.$emit("saved", data);

        this.form = this.getEmptyForm();

    },

    cancel() {

      this.errors = {};

      this.form = this.getEmptyForm();

      this.$emit("cancel");

    }
  }
};
</script>

