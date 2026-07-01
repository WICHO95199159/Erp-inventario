<template>
  <div class="form-container">
    <div v-if="consultando" class="consult-title">
        🔎 Consultando herramienta...
    </div>

    <div v-else-if="form.id" class="form-title">
        ✏️ Editando herramienta...
    </div>

    <div v-else class="new-title">
        ➕ Nueva herramienta
    </div>
    <hr>
    <div class="grid">
      <div class="field">
        <label>UBICACIÓN 1</label>
        <input v-model="form.ubicacion1" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>UBICACIÓN 2</label>
        <input v-model="form.ubicacion2" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" :disabled="consultando"/>
      </div>
      
      <div class="field">
        <label>NOMBRE</label>
        <input v-model="form.nombre" :disabled="consultando"/>
      </div>

      <div class="field field-double">
        <label>DESCRIPCIÓN</label>
        <textarea v-model="form.descripcion" :disabled="consultando" class="form-textarea-md"></textarea>
      </div>

      <div class="field field-double">
        <label>NOTA</label>
        <textarea v-model="form.nota" :disabled="consultando" class="form-textarea-md"></textarea>
      </div>
      
      <div class="field" v-if="!editData">
        <label>CANTIDAD</label>
        <input type="number" v-model="form.cantidad" min="1" value="1" :disabled="consultando"/>
      </div>

    </div>

    <div class="actions">
      <button
          v-if="!consultando"
          class="btn btn-save"
          @click="save">
          Guardar
      </button>
      <button
          class="btn btn-cancel"
          @click="cancel">
          Cancelar
      </button>
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
      form: {
        ubicacion1: "",
        ubicacion2: "",
        tipo: "",
        nombre: "",
        descripcion: "",
        nota: "",
        cantidad: 1
      }
    };
  },

  watch: {
    editData: {
      immediate: true,
      handler(val) {
        if (val) this.form = { ...val };
      }
    }
  },

  methods: {
    async save() {
      let data = { ...this.form };

      // 🔥 NORMALIZAR TODO A MAYÚSCULAS
      Object.keys(data).forEach(key => {
        if (typeof data[key] === "string") {
          data[key] = data[key].toUpperCase().trim();
        }
      });

      if (data.id) {
        const id = data.id;
        delete data.id;

        await api.put(`/herramientas/${id}`, data);
      } else {
        await api.post("/herramientas", data);
      }

      this.$emit("saved");
      this.resetForm();
    },

    cancel() {
      this.resetForm();
      this.$emit("cancelEdit");
    },

    resetForm(){
        this.form={
            ubicacion1:"",
            ubicacion2:"",
            tipo:"",
            nombre:"",
            descripcion:"",
            nota:"",
            cantidad:1
        }
    }
  }
};
</script>

<style scoped>
@import "../assets/styles/forms.css";
@import "../assets/styles/buttons.css";
</style>