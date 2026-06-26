<template>
  <div class="form-wrapper">

    <div class="form-container">

      <!-- 🔥 TÍTULO DINÁMICO -->
      <div v-if="consultando" class="consult-title">
          🔍 Consultando puerto...
      </div>

      <div v-else-if="form.id" class="form-title">
          ✏️ Editando puerto...
      </div>

      <div v-else class="form-title">
          ➕ Nuevo registro
      </div>
      <hr>
      <!-- 🔥 GRID DE INPUTS -->
      <div class="form-grid">

        <!-- <div class="field">
          <label>ID</label>
          <input class="id" v-model="form.id" disabled />
        </div> -->

        <div class="field">
          <label>UBICACIÓN</label>
          <input class="forminput" v-model="form.location" :disabled="consultando" />
        </div>

        <div class="field">
          <label>RACK</label>
          <input class="forminput" v-model="form.rack" :disabled="consultando" />
        </div>

        <div class="field">
          <label>DISPOSITIVO</label>
          <input class="forminput" v-model="form.device" :disabled="consultando" />
        </div>
        
        <div class="field">
          <label>PUERTO</label>
          <input type="number" class="forminput" v-model="form.port_number" :disabled="consultando" />
        </div>

        <div class="field">
          <label>PATCH PANEL</label>
          <input class="forminput" v-model="form.patchpanel" :disabled="consultando" />
        </div>

        <div class="field">
          <label>PUERTO PP</label>
          <input type="number" class="forminput" v-model="form.port_number_pp" :disabled="consultando" />
        </div>

        <div class="field">
          <label>NODO FINAL</label>
          <input class="forminput" v-model="form.location_node" :disabled="consultando" />
        </div>

      </div>

      <!-- 🔥 BOTONES -->
      <div class="buttons">
        <button v-if="!consultando" @click="save"> Guardar </button>
        <button @click="cancel" class="cancel">Cancelar</button>
      </div>

    </div>

  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: [
      "editData",
      "consultando"
  ],

  data() {
    return {
      form: {}
    };
  },

  watch: {
    editData: {
        immediate: true,
        handler(val) {
        this.form = val ? { ...val } : {};
        }
    }
    },

  methods: {
    async save() {
      if (this.form.id) {
        await api.put(`/ports/${this.form.id}`, this.form);
      } else {
        await api.post("/ports", this.form);
      }

      this.$emit("saved");
      this.form = {};
    },

    cancel() {

        this.form = {};

        this.$emit("cancel");

    }
  }
};
</script>

<style>

/* 🔥 CONTENEDOR GENERAL (centra todo) */
.form-wrapper {
  display: flex;
  justify-content: left;  
}

/* 🔥 CAJA DEL FORM */
.form-container {
  width: 100%;
  max-width: 1100px; /* 👈 evita que se expanda demasiado */
  margin-right: 15px;
}

/* 🔥 GRID DE INPUTS */
.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 10px;
  margin-bottom: 15px;
}

/* Inputs */
.forminput {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #555;
  width: 135px;
}

/* 🔥 BOTONES */
.buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* Botones base */
button {
  padding: 8px 14px;
  border-radius: 6px;
  border: none;
  cursor: pointer;
}

/* Guardar */
button:first-child {
  background-color: #3498db;
  color: white;
}

/* Cancelar */
.cancel {
  background-color: #e74c3c;
  color: white;
}

.forminput:disabled{
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

.form-title{
    margin-bottom:10px;
    font-weight:bold;
    color:#f59e0b;
}

</style>