<template>
  <div class="form-container">
    <div v-if="consultando" class="consult-title">
        🔎 Consultando equipo de audio...
    </div>

    <div v-else-if="form.id" class="form-title">
        ✏️ Editando equipo de audio...
    </div>

    <div v-else class="new-title">
        ➕ Nuevo equipo de audio
    </div>

    <hr>
    <div class="grid">
      <div class="field">
        <label>EDIFICIO</label>
        <input v-model="form.edificio" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>NO. SALÓN</label>
        <input type="number" v-model="form.salon" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>MARCA</label>
        <input v-model="form.marca" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>MODELO</label>
        <input v-model="form.modelo" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>NO. DE SERIE</label>
        <input v-model="form.no_serie" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>MAC</label>
        <input v-model="form.mac" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>CONTROL</label>
        <input v-model="form.control" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>FUNCIONAL</label>
        <input v-model="form.funcional" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>NOTAS</label>
        <textarea v-model="form.notas" :disabled="consultando" class="form-textarea-sm"></textarea>
      </div>

      <div class="field field-small" v-if="!editData">
        <label>CANTIDAD DE REGISTROS</label>
        <input
            type="number"
            min="1"
            v-model="form.cantidad"
            :disabled="consultando"
        />
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
        edificio: "",
        salon: "",
        tipo: "",
        marca: "",
        modelo: "",
        no_serie: "",
        mac: "",
        control: "",
        funcional: "",
        notas: "",
        cantidad: 1,
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

        await api.put(`/equipos-audio/${id}`, data);
      } else {
        await api.post("/equipos-audio", data);
      }

      this.$emit("saved");
      this.resetForm();
    },

    cancel() {
      this.resetForm();
      this.$emit("cancelEdit");
    },

    resetForm() {
      this.form = {
        ubicacion: "",
        tipo: "",
        marca: "",
        modelo: "",
        no_serie: "",
        cantidad: 1,
      };
    }
  }
};
</script>

<style scoped>
@import "../assets/styles/forms.css";
@import "../assets/styles/buttons.css";
</style>