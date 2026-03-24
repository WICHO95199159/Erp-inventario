<template>
  <div class="form-container">

    <!-- 🔥 TÍTULO DINÁMICO -->
    <div v-if="form.id" class="edit-title">
      ✏️ Editando ...
    </div>

    <!-- 🔥 GRID -->
    <div class="form-grid">

      <div class="field">
        <label>NODO</label>
        <input v-model="form.nodo" />
      </div>

      <div class="field">
        <label>NOMBRE</label>
        <input v-model="form.nombre" />
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
        <label>PROCESADOR</label>
        <input v-model="form.procesador" />
      </div>

      <div class="field">
        <label>ALMACENAMIENTO</label>
        <input v-model="form.tipo_almacenamiento" />
      </div>

      <div class="field">
        <label>ALMACENAMIENTO (GB)</label>
        <input v-model="form.almacenamiento" />
      </div>

      <div class="field">
        <label>RAM</label>
        <input v-model="form.ram" />
      </div>

      <div class="field">
        <label>SISTEMA OPERATIVO</label>
        <input v-model="form.sistema_operativo" />
      </div>

    </div>

    <!-- 🔥 BOTONES -->
    <div class="actions">
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
        nodo: "",
        nombre: "",
        marca: "",
        modelo: "",
        no_serie: "",
        mac: "",
        procesador: "",
        tipo_almacenamiento: "",
        almacenamiento: "",
        ram: "",
        sistema_operativo: ""
      };
    },

    save() {
      this.$emit("saved", this.form);
      this.form = this.getEmptyForm();
    },

    cancel() {
      this.form = this.getEmptyForm();
      this.$emit("saved", null); // 🔥 indica cancelar
    }
  }
};
</script>

<style scoped>
.form-container {
  margin-bottom: 20px;
}

.edit-title {
  margin-bottom: 10px;
  font-weight: bold;
  color: #60a5fa;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.field {
  display: flex;
  flex-direction: column;
}

.field label {
  font-size: 12px;
  margin-bottom: 4px;
  color: #cbd5e1;
}

.field input {
  padding: 8px;
  border-radius: 6px;
  border: none;
}

.actions {
  margin-top: 15px;
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn-save {
  background: #3b82f6;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}

.btn-cancel {
  background: #ef4444;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
}
</style>