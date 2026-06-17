<template>
  <div class="form-container">

    <!-- 🔥 TÍTULO DINÁMICO -->
    <div v-if="form.id" class="edit-title">
      ✏️ Editando equipo de cómputo ...
    </div>

    <div v-else class="new-title">
      ➕ Nuevo registro
    </div>

    <hr>

    <!-- 🔥 GRID -->
    <div class="form-grid">

      <div class="field">
        <label>EDIFICIO</label>
        <input v-model="form.edificio" />
      </div>

      <div class="field">
        <label>PLANTA</label>
        <input v-model="form.planta" />
      </div>

      <div class="field">
        <label>No. SALÓN</label>
        <input type="number" v-model="form.salon" />
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
        <label>TIPO DE ALMACENAMIENTO</label>
        <input v-model="form.tipo_almacenamiento" />
      </div>

      <div class="field">
        <label>ALMACENAMIENTO (GB)</label>
        <input type="number" v-model="form.almacenamiento" />
      </div>

      <div class="field">
        <label>RAM</label>
        <input type="number" v-model="form.ram" />
      </div>

      <div class="field">
        <label>SISTEMA OPERATIVO</label>
        <input v-model="form.sistema_operativo" />
      </div>

      <div class="field">
        <label>IP</label>
        <input v-model="form.ip" />
      </div>

      <div class="field" v-if="!editData">
        <label>CANTIDAD</label>
        <input type="number" v-model="form.cantidad" min="1" />
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
        id: null,
        edificio: "",
        planta: "",
        salon: "",
        nombre: "",
        marca: "",
        modelo: "",
        no_serie: "",
        mac: "",
        procesador: "",
        tipo_almacenamiento: "",
        almacenamiento: "",
        ram: "",
        sistema_operativo: "",
        ip: "",
        cantidad: 1 // 🔥 SOLO FRONTEND
      };
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