<template>
  <div class="form-container">

    <div v-if="consultando" class="consult-title">
        🔍 Consultando impresora...
    </div>

    <div v-else-if="form.id" class="edit-title">
        ✏️ Editando impresora...
    </div>

    <div v-else class="new-title">
        ➕ Nueva impresora
    </div>

    <hr>
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
        <label>MAC</label>
        <input v-model="form.mac" :disabled="consultando" />
      </div>

      <div class="field">
        <label>CONEXIÓN</label>
        <input v-model="form.conexion" :disabled="consultando" />
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" :disabled="consultando" />
      </div>

      <div class="field">
        <label>CONSUMIBLE</label>
        <input v-model="form.consumible" :disabled="consultando" />
      </div>

      <div class="field">
        <label>MODELO DE CONSUMIBLE</label>
        <input v-model="form.modelo_consumible" :disabled="consultando" />
      </div>

      <div class="field">
        <label>IP / NOMBRE</label>
        <input v-model="form.ip_nombre" :disabled="consultando" />
      </div>

      <div class="field">
        <label>USUARIO</label>
        <input v-model="form.usuario" :disabled="consultando" />
      </div>

      <div class="field">
        <label>PIN</label>
        <input v-model="form.pin" :disabled="consultando" />
      </div>

    </div>

    <div class="buttons">
      <button v-if="!consultando" class="btn btn-save" @click="save"> Guardar </button>
      <button class="btn btn-cancel" @click="cancel">Cancelar</button>
    </div>

  </div>
</template>


<script>
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
        pin: "",
      };
    },

    save() {
      this.$emit("saved", this.form);
      this.form = this.getEmptyForm();
    },

    cancel(){
        this.form=this.getEmptyForm();
        this.$emit("cancel");
    }
  }
};
</script>


<style scoped>
.form-container {
  margin-bottom: 20px;
}

/* 🔥 GRID RESPONSIVE */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

/* 🔥 CAMPO */
.field {
  display: flex;
  flex-direction: column;
}

/* 🔥 LABEL */
label {
  font-size: 12px;
  margin-bottom: 4px;
  color: #cbd5f5; /* tono claro tipo tu UI */
  font-weight: 600;
}

/* 🔥 INPUT */
input {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

/* INPUTS EN MODO CONSULTA */

.field input:disabled{
    background:#1e293b;
    color:#93c5fd;
    opacity:1;
    border:1px solid #3b82f6;
    font-weight:bold;
    cursor:not-allowed;
}

/* TÍTULOS */

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