<template>
  <div class="form-wrapper">

    <div class="form-container">

      <!-- 🔥 TÍTULO DINÁMICO -->
      <div class="form-title">
        <span v-if="form.id">
          ✏️ Editando: {{ form.location }} - {{ form.dispositivo }} - Puerto {{ form.port_number }}
        </span>
        <span v-else>
          ➕ Nuevo registro
        </span>
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
          <input class="forminput" v-model="form.location" />
        </div>

        <div class="field">
          <label>RACK</label>
          <input class="forminput" v-model="form.rack" />
        </div>

        <div class="field">
          <label>DISPOSITIVO</label>
          <input class="forminput" v-model="form.device" />
        </div>
        
        <div class="field">
          <label>PUERTO</label>
          <input class="forminput" v-model="form.port_number" />
        </div>

        <div class="field">
          <label>PATCH PANEL</label>
          <input class="forminput" v-model="form.patchpanel" />
        </div>

        <div class="field">
          <label>PUERTO PP</label>
          <input class="forminput" v-model="form.port_number_pp" />
        </div>

        <div class="field">
          <label>UBICACIÓN NODO</label>
          <input class="forminput" v-model="form.location_node" />
        </div>

      </div>

      <!-- 🔥 BOTONES -->
      <div class="buttons">
        <button @click="save">Guardar</button>
        <button @click="cancel" class="cancel">Cancelar</button>
      </div>

    </div>

  </div>
</template>

<script>
import api from "../services/api";

export default {
  props: ["editData"],

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
      this.$emit("saved"); // limpia selección en App.vue
    }
  }
};
</script>

<style>

/* 🔥 CONTENEDOR GENERAL (centra todo) */
.form-wrapper {
  display: flex;
  justify-content: center;
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

</style>