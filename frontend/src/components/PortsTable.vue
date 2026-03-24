<template>
  <div class="container">
    
    <input 
      v-model="search" 
      placeholder="Buscar..." 
      class="search"
    />

    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th @click="sort('location')">UBICACIÓN</th>
            <th @click="sort('rack')">RACK</th>
            <th @click="sort('device')">DISPOSITIVO</th>
            <th @click="sort('port_number')">PUERTO</th>
            <th @click="sort('patchpanel')">PATCH PANEL</th>
            <th @click="sort('port_number_pp')">PUERTO PP</th>
            <th @click="sort('location_node')">UBICACIÓN NODO</th>
            <th>ACCIONES</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="row in filteredData" :key="row.id">
            <td>{{ row.location }}</td>
            <td>{{ row.rack }}</td>
            <td>{{ row.device }}</td>
            <td>{{ row.port_number }}</td>
            <td>{{ row.patchpanel }}</td>
            <td>{{ row.port_number_pp }}</td>
            <td>{{ row.location_node }}</td>
            <td>
              <button @click="$emit('edit', row)">Editar</button>
              <button @click="deleteRow(row.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script>
import api from "../services/api";

export default {
  data() {
    return {
      ports: [],
      search: "",
      sortKey: ""
    };
  },

  computed: {
    filteredData() {
      return this.ports
        .filter(p =>
          Object.values(p).some(v =>
            String(v).toLowerCase().includes(this.search.toLowerCase())
          )
        )
        .sort((a, b) => {
        if (!this.sortKey) return 0;

        return String(a[this.sortKey] ?? "")
            .localeCompare(String(b[this.sortKey] ?? ""), undefined, {
            numeric: true,
            sensitivity: "base"
            });
        });
    }
  },

  methods: {
    async load() {
      const res = await api.get("/ports");
      this.ports = res.data;
    },

    sort(key) {
      this.sortKey = key;
    },

    async deleteRow(id) {
      await api.delete(`/ports/${id}`);
      this.load();
    }
  },

  mounted() {
    this.load();

    this.interval = setInterval(() => {
      if (!document.hidden) {
        this.load();
      }
    }, 5000);
  },

  beforeUnmount() {
    clearInterval(this.interval);
  }
};
</script>

<style>
body {
  background: #020617; /* más oscuro que antes */
  color: #e2e8f0;
}

.container {
  padding: 0px;
  font-family: Arial, sans-serif;
}

.search {
  margin-bottom: 50px;
  padding: 8px;
  width: 300px;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.table-container {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #ddd;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

thead {
  background-color: #2c3e50;
  color: white;
  position: sticky;
  top: 0;
}

th {
  padding: 10px;
  cursor: pointer;
  text-align: left;
}

td {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

tr:hover {
  background-color: #4279af;
}

button {
  margin-right: 5px;
  padding: 5px 8px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
  letter-spacing: 0.5px;
}

button:hover {
  opacity: 0.5;
}

button:first-child {
  background-color: #3498db;
  color: white;
}

button:last-child {
  background-color: #e74c3c;
  color: white;
}
</style>