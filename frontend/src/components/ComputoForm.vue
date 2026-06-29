<template>
  <div class="form-container">

    <!-- 🔥 TÍTULO DINÁMICO -->
    <div v-if="consultando" class="edit-title">
      🔍 Consultando equipo de cómputo...
    </div>
    
    <div v-else-if="form.id" class="edit-title">
      ✏️ Editando equipo de cómputo ...
    </div>

    <div v-else class="new-title">
      ➕ Nuevo registro
    </div>

    <hr>

    <!-- 🔥 GRID -->
    <div class="form-grid">

      <div class="field">
        <label>VERIFICADO</label>
        <input v-model="form.verificado"
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>EDIFICIO</label>
        <input v-model="form.edificio" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>PLANTA</label>
        <input v-model="form.planta" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>No. SALÓN</label>
        <input type="number" v-model="form.salon" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>TIPO</label>
        <input v-model="form.tipo" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>ESTATUS</label>
        <input v-model="form.estatus" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>NOMBRE</label>
        <input v-model="form.nombre" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MARCA</label>
        <input v-model="form.marca" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MODELO</label>
        <input v-model="form.modelo" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>NO. DE SERIE</label>
        <input v-model="form.no_serie" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MAC</label>
        <input v-model="form.mac" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>PROCESADOR</label>
        <input v-model="form.procesador" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>DETALLE DEL PROCESADOR</label>
        <input v-model="form.detalle_procesador" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>TIPO DE ALMACENAMIENTO</label>
        <input v-model="form.tipo_almacenamiento" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>ALMACENAMIENTO (GB)</label>
        <input type="number" v-model="form.almacenamiento" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>RAM</label>
        <input type="number" v-model="form.ram" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>SISTEMA OPERATIVO</label>
        <input v-model="form.sistema_operativo" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>DETALLE DEL SO</label>
        <input v-model="form.detalle_so" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>IP</label>
        <input v-model="form.ip" 
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>RUST ID</label>
        <input type="number" v-model="form.rust_id" min="0" max="999999999"
        :disabled="consultando" />
      </div>

      <div class="field">
        <label>MANTENIMIENTO</label>
        <input type="number" v-model="form.fecha_mtto" min="0" max="3000" 
        :disabled="consultando" />
      </div>

      <div class="field" v-if="!editData">
        <label>CANTIDAD DE REGISTROS</label>
        <input type="number" v-model="form.cantidad" min="1" 
        :disabled="consultando" />
      </div>
    </div>

    <!-- 🔥 BOTONES -->
    <div class="actions">
      <button v-if="!consultando" class="btn btn-save" @click="save"> Guardar </button>
      <button class="btn btn-cancel" @click="cancel">Cancelar</button>
    </div>

  </div>
</template>

<script>
export default {
  props: [
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
        id: null,
        verificado: "",
        edificio: "",
        planta: "",
        salon: "",
        tipo: "",
        estatus: "",
        nombre: "",
        marca: "",
        modelo: "",
        no_serie: "",
        mac: "",
        procesador: "",
        detalle_procesador: "",
        tipo_almacenamiento: "",
        almacenamiento: "",
        ram: "",
        sistema_operativo: "",
        detalle_so: "",
        ip: "",
        rust_id: "",
        fecha_mtto: "",
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

.field input:disabled {
  background: #1e293b;
  color: #93c5fd;
  opacity: 1;
  border: 1px solid #3b82f6;
  font-weight: bold;
  cursor: not-allowed;
}
</style>