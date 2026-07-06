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

      <div class="field">
        <label>VERIFICADO</label>
        <input v-model="form.verificado"
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>EDIFICIO</label>
        <input v-model="form.edificio" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>PLANTA</label>
        <input v-model="form.planta" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>No. SALÓN</label>
        <input type="number" v-model="form.salon" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>ESTATUS</label>
        <input v-model="form.estatus" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>NOMBRE</label>
        <input v-model="form.nombre" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MARCA</label>
        <input v-model="form.marca" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MODELO</label>
        <input v-model="form.modelo" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>NO. DE SERIE</label>
        <input v-model="form.no_serie" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MAC</label>
        <input v-model="form.mac" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>PROCESADOR</label>
        <input v-model="form.procesador" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>DETALLE DEL PROCESADOR</label>
        <input v-model="form.detalle_procesador" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>TIPO DE ALMACENAMIENTO</label>
        <input v-model="form.tipo_almacenamiento" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>ALMACENAMIENTO (GB)</label>
        <input type="number" v-model="form.almacenamiento" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>RAM</label>
        <input type="number" v-model="form.ram" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>SISTEMA OPERATIVO</label>
        <input v-model="form.sistema_operativo" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>DETALLE DEL SO</label>
        <input v-model="form.detalle_so" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>IP</label>
        <input v-model="form.ip" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>RUST ID</label>
        <input type="number" v-model="form.rust_id" min="0" max="999999999"
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MANTENIMIENTO</label>
        <input type="number" v-model="form.fecha_mtto" min="0" max="3000" 
        :disabled="consultando" />
      </div>

      <div class="field" v-if="!editData">
        <label>CANTIDAD DE REGISTROS</label>
        <input type="number" v-model="form.cantidad" min="1" 
        :disabled="consultando" />
      </div>
    </div>

    <!-- 🔥 BOTONES -->
    <div class="actions">
      <button v-if="!consultando" class="btn btn-save" @click="save"> Guardar </button>
      <button class="btn btn-cancel" @click="cancel">Cancelar</button>
    </div>

  </div>
</template>

<script>
export default {
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

          alert(`El campo "${requiredFields[key]}" es obligatorio.`);

          return false;

        }

      }

      return true;

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

      this.$emit("saved", data);

      this.form = this.getEmptyForm();

    },

    cancel() {
      this.form = this.getEmptyForm();
      this.$emit("cancel");
    }
  }
};
</script>

