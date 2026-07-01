<template>
  <div class="form-container">
    <div v-if="consultando" class="consult-title">
        🔎 Consultando equipo de video...
    </div>

    <div v-else-if="form.id" class="form-title">
        ✏️ Editando equipo de video...
    </div>

    <div v-else class="new-title">
        ➕ Nuevo equipo de video
    </div>
    <hr>
    <div class="grid">

      <div class="field">
        <label>VERIFICADO</label>
        <input v-model="form.verificado" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>EDIFICIO</label>
        <input v-model="form.edificio" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>PLANTA</label>
        <input v-model="form.planta" :disabled="consultando"/>
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
        <label>ESTATUS</label>
        <input v-model="form.estatus" :disabled="consultando"/>
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
        <label>PULGADAS</label>
        <input type="number" v-model="form.pulgadas" :disabled="consultando"/>
      </div>

      <div class="field">
        <label>EQUIPO DE CÓMPUTO</label>
        <input v-model="form.equipo_computo" :disabled="consultando"/>
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
        <textarea v-model="form.notas" :disabled="consultando"></textarea>
      </div>

      <div class="field" v-if="!editData">
        <label>CANTIDAD DE REGISTROS</label>
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
  props:[
      "editData",
      "consultando"
  ],

  data() {
    return {
      form: {
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

        await api.put(`/equipos-video/${id}`, data);
      } else {
        await api.post("/equipos-video", data);
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
        cantidad: 1 // 🔥 SOLO FRONTEND
      };
    }
  }
};
</script>

<style scoped>
@import "../assets/styles/forms.css";
@import "../assets/styles/buttons.css";
</style>