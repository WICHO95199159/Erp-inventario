<template>

    <!-- ======================================
         CONTENEDOR DE LA TABLA
    ======================================= -->

    <div class="table-wrapper">

        <div class="table-container table-height-md">

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
                            Cantidad
                        </th>

                        <th class="table-actions">
                            ACCIONES
                        </th>

                        <th @click="sort('ubicacion1')">
                            UBICACIÓN 1
                        </th>

                        <th @click="sort('ubicacion2')">
                            UBICACIÓN 2
                        </th>

                        <th @click="sort('tipo')">
                            TIPO
                        </th>

                        <th @click="sort('nombre')">
                            NOMBRE
                        </th>

                        <th @click="sort('descripcion')">
                            DESCRIPCIÓN
                        </th>

                        <th @click="sort('nota')">
                            NOTA
                        </th>

                    </tr>

                </thead>

                <!-- ======================================
                     CUERPO
                ======================================= -->

                <tbody>

                    <tr
                        v-for="(row,index) in filteredData"
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

                        <td>{{ row.ubicacion1 }}</td>

                        <td>{{ row.ubicacion2 }}</td>

                        <td>{{ row.tipo }}</td>

                        <td>{{ row.nombre }}</td>

                        <td>{{ row.descripcion }}</td>

                        <td>{{ row.nota }}</td>

                    </tr>

                    <!-- ======================================
                         TABLA VACÍA
                    ======================================= -->

                    <tr v-if="filteredData.length === 0">

                        <td
                            class="table-empty"
                            colspan="8"
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

            herramientas: [],

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

            let result = [...this.herramientas];

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

                    const compare = valueA.localeCompare(
                        valueB,
                        undefined,
                        {
                            numeric: true,
                            sensitivity: "base"
                        }
                    );

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

                const response = await api.get("/herramientas");

                this.herramientas = response.data;

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
                row.nombre ||
                row.tipo ||
                "esta herramienta";

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