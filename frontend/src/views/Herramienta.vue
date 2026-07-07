<template>
  <div class="page">

    <HerramientasForm
      :editData="selected"
      :consultando="consultando"
      @saved="save"
      @cancel="cancelForm"
    />

    <div class="search-group">

      <input
        v-model="search"
        class="search"
        placeholder="Buscar..."
      />

    </div>

    <HerramientasTable
      ref="table"
      :search="search"
      @edit="editRow"
      @consultar="consultarRow"
      @delete="deleteRow"
    />

  </div>
</template>

<script>
import api from "../services/api";
import HerramientasForm from "../components/HerramientasForm.vue";
import HerramientasTable from "../components/HerramientasTable.vue";

export default {

  components: {
    HerramientasForm,
    HerramientasTable
  },

  data() {
    return {
      selected: null,
      consultando: false,
      search: ""
    };
  },

  methods: {

    // ======================================
    // RECARGAR
    // ======================================

    reload() {

      this.selected = null;
      this.consultando = false;

      this.$refs.table.load();

    },

    // ======================================
    // EDITAR
    // ======================================

    editRow(row) {

      this.selected = row;
      this.consultando = false;

    },

    // ======================================
    // CONSULTAR
    // ======================================

    consultarRow(row) {

      this.selected = row;
      this.consultando = true;

    },

    // ======================================
    // CANCELAR
    // ======================================

    cancelForm() {

      this.selected = null;
      this.consultando = false;

    },

    // ======================================
    // GUARDAR
    // ======================================

    async save(data) {

      try {

        const cleanData = { ...data };

        const cantidad = Math.max(
          1,
          parseInt(cleanData.cantidad) || 1
        );

        delete cleanData.cantidad;

        if (cleanData.id) {

          const id = cleanData.id;

          delete cleanData.id;

          await api.put(`/herramientas/${id}`, cleanData);

        } else {

          const requests = [];

          for (let i = 0; i < cantidad; i++) {

            requests.push(
              api.post("/herramientas", {
                ...cleanData
              })
            );

          }

          await Promise.all(requests);

        }

        this.reload();

      }

      catch (error) {

        console.error("Error al guardar:", error);

      }

    },

    // ======================================
    // ELIMINAR
    // ======================================

    async deleteRow(id) {

      try {

        await api.delete(`/herramientas/${id}`);

        this.reload();

      }

      catch (error) {

        console.error("Error al eliminar:", error);

      }

    }

  },

  mounted() {

    this.reload();

  }

};
</script>