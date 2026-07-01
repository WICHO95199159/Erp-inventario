<template>

    <div class="form-container">

      <!-- 🔥 TÍTULO DINÁMICO -->
      <div v-if="consultando" class="consult-title">
          🔍 Consultando puerto...
      </div>

      <div v-else-if="form.id" class="form-title">
          ✏️ Editando puerto...
      </div>

      <div v-else class="new-title">
          ➕ Nuevo registro
      </div>
      <hr>
      <!-- 🔥 GRID DE INPUTS -->
      <div class="grid">

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
      <div class="actions">
        <button v-if="!consultando" class="btn btn-save" @click="save"> Guardar </button>
        <button @click="cancel" class="btn btn-cancel">Cancelar</button>
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

<style scoped>
@import "../assets/styles/forms.css";
@import "../assets/styles/buttons.css";
</style>