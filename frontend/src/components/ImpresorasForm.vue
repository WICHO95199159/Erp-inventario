<template>
  <div class="form-container">

    <h3 v-if="form.id">✏️ Editando impresora ...</h3>
    <h3 v-else>➕ Nueva impresora</h3>
    <hr>
    <div class="form-grid">

      <div class="field">
        <label>UBICACIÓN</label>
        <input v-model="form.ubicacion" />
      </div>

      <div class="field">
        <label>MARCA</label>
        <input v-model="form.marca" />
      </div>

      <div class="field">
        <label>MODELO</label>
        <input v-model="form.modelo" />
      </div>

      <div class="field">
        <label>NO. DE SERIE</label>
        <input v-model="form.no_serie" />
      </div>

      <div class="field">
        <label>MAC</label>
        <input v-model="form.mac" />
      </div>

      <div class="field">
        <label>CONEXIÓN</label>
        <input v-model="form.conexion" />
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" />
      </div>

      <div class="field">
        <label>CONSUMIBLE</label>
        <input v-model="form.consumible" />
      </div>

      <div class="field">
        <label>MODELO DE CONSUMIBLE</label>
        <input v-model="form.modelo_consumible" />
      </div>

      <div class="field">
        <label>IP / NOMBRE</label>
        <input v-model="form.ip_nombre" />
      </div>

      <div class="field">
        <label>USUARIO</label>
        <input v-model="form.usuario" />
      </div>

      <div class="field">
        <label>PIN</label>
        <input v-model="form.pin" />
      </div>

    </div>

    <div class="buttons">
      <button class="btn-save" @click="save">Guardar</button>
      <button class="btn-cancel" @click="cancel">Cancelar</button>
    </div>

  </div>
</template>


<script>
export default {
  props: ["editData"],

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

    cancel() {
      this.form = this.getEmptyForm();
      this.$emit("saved", null);
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

/* 🔥 BOTONES */
.buttons {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

.btn-save {
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
}

.btn-cancel {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
}
</style>