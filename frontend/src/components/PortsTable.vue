<template>

    <!-- ======================================
         CONTENEDOR DE LA TABLA
    ======================================= -->

    <div class="table-wrapper">

        <div class="table-container table-height-lg">

            <!-- ======================================
                 TABLA
            ======================================= -->

            <table class="table table-lg table-hover table-sticky">

                <!-- ======================================
                     ENCABEZADOS
                ======================================= -->

                <thead>

                    <tr>

                        <th class="table-number">
                            #
                        </th>

                        <th class="table-actions">
                            ACCIONES
                        </th>

                        <th @click="sort('location')">
                            UBICACIÓN
                        </th>

                        <th @click="sort('rack')">
                            RACK
                        </th>

                        <th @click="sort('device')">
                            DISPOSITIVO
                        </th>

                        <th @click="sort('port_number')">
                            PUERTO
                        </th>

                        <th @click="sort('patchpanel')">
                            PATCH PANEL
                        </th>

                        <th @click="sort('port_number_pp')">
                            PUERTO PP
                        </th>

                        <th @click="sort('location_node')">
                            NODO FINAL
                        </th>

                    </tr>

                </thead>

                <!-- ======================================
                     CUERPO
                ======================================= -->

                <tbody>

                    <tr
                        v-for="(row, index) in filteredData"
                        :key="row.id"
                    >

                        <!-- ======================================
                             NUMERACIÓN
                        ======================================= -->

                        <td class="table-number">

                            {{ index + 1 }}

                        </td>

                        <!-- ======================================
                             BOTONES
                        ======================================= -->

                        <td class="table-actions">

                            <div class="table-actions-group">

                                <button
                                    class="btn btn-consult"
                                    @click="$emit('consultar', row)"
                                >
                                    Consultar
                                </button>

                                <button
                                    class="btn btn-edit"
                                    @click="$emit('edit', row)"
                                >
                                    Editar
                                </button>

                                <button
                                    class="btn btn-delete"
                                    @click="confirmDelete(row)"
                                >
                                    Eliminar
                                </button>

                            </div>

                        </td>

                        <!-- ======================================
                             DATOS
                        ======================================= -->

                        <td>{{ row.location }}</td>

                        <td>{{ row.rack }}</td>

                        <td>{{ row.device }}</td>

                        <td>{{ row.port_number }}</td>

                        <td>{{ row.patchpanel }}</td>

                        <td>{{ row.port_number_pp }}</td>

                        <td>{{ row.location_node }}</td>

                    </tr>

                    <!-- ======================================
                         TABLA VACÍA
                    ======================================= -->

                    <tr v-if="filteredData.length === 0">

                        <td
                            class="table-empty"
                            colspan="9"
                        >

                            No se encontraron registros.

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

    props: {

        search: {
            type: String,
            default: ""
        }

    },

    data() {

        return {

            ports: [],

            sortKey: "",

            sortAsc: true,

            interval: null

        };

    },

    /* ======================================
       COMPUTED
    ====================================== */

    computed: {

        filteredData() {

            let result = [...this.ports];

            // Buscar general

            if (this.search) {

                result = result.filter(row =>

                    Object.values(row)
                        .join(" ")
                        .toLowerCase()
                        .includes(this.search.toLowerCase())

                );

            }

            // Ordenamiento

            if (this.sortKey) {

                result.sort((a, b) => {

                    const valueA = String(a[this.sortKey] ?? "");
                    const valueB = String(b[this.sortKey] ?? "");

                    const compare = valueA.localeCompare(valueB, undefined, {

                        numeric: true,
                        sensitivity: "base"

                    });

                    return this.sortAsc
                        ? compare
                        : -compare;

                });

            }

            return result;

        }

    },

    /* ======================================
       MÉTODOS
    ====================================== */

    methods: {

        async load() {

            try {

                const response = await api.get("/ports");

                this.ports = response.data;

            }

            catch (error) {

                console.error(error);

            }

        },

        sort(key) {

            if (this.sortKey === key) {

                this.sortAsc = !this.sortAsc;

            }

            else {

                this.sortKey = key;

                this.sortAsc = true;

            }

        },

        confirmDelete(row) {

            const nombre =
                row.device ||
                row.location ||
                "este registro";

            const ok = confirm(

                `¿Deseas eliminar ${nombre}?`

            );

            if (!ok) return;

            this.$emit("delete", row.id);

        }

    },

    /* ======================================
       CICLO DE VIDA
    ====================================== */

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