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
                            #
                        </th>

                        <th class="table-actions">
                            ACCIONES
                        </th>

                        <th @click="sort('verificado')">
                            VERIFICADO
                        </th>

                        <th @click="sort('edificio')">
                            EDIFICIO
                        </th>

                        <th @click="sort('planta')">
                            PLANTA
                        </th>

                        <th @click="sort('salon')">
                            SALÓN
                        </th>

                        <th @click="sort('tipo')">
                            TIPO
                        </th>

                        <th @click="sort('estatus')">
                            ESTATUS
                        </th>

                        <th @click="sort('marca')">
                            MARCA
                        </th>

                        <th @click="sort('modelo')">
                            MODELO
                        </th>

                        <th @click="sort('no_serie')">
                            NO. DE SERIE
                        </th>

                        <th @click="sort('pulgadas')">
                            PULGADAS
                        </th>

                        <th @click="sort('equipo_computo')">
                            EQUIPO DE CÓMPUTO
                        </th>

                        <th @click="sort('control')">
                            CONTROL
                        </th>

                        <th @click="sort('funcional')">
                            FUNCIONAL
                        </th>

                        <th @click="sort('notas')">
                            NOTAS
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

                        <td>{{ row.verificado }}</td>

                        <td>{{ row.edificio }}</td>

                        <td>{{ row.planta }}</td>

                        <td>{{ row.salon }}</td>

                        <td>{{ row.tipo }}</td>

                        <td>{{ row.estatus }}</td>

                        <td>{{ row.marca }}</td>

                        <td>{{ row.modelo }}</td>

                        <td>{{ row.no_serie }}</td>

                        <td>{{ row.pulgadas }}</td>

                        <td>{{ row.equipo_computo }}</td>

                        <td>{{ row.control }}</td>

                        <td>{{ row.funcional }}</td>

                        <td>{{ row.notas }}</td>

                    </tr>

                    <!-- ======================================
                         TABLA VACÍA
                    ======================================= -->

                    <tr v-if="filteredData.length === 0">

                        <td
                            class="table-empty"
                            colspan="16"
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

        search1: {
            type: String,
            default: ""
        },

        search2: {
            type: String,
            default: ""
        }

    },

    data() {

        return {

            equipos: [],

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

            let result = [...this.equipos];

            // Buscar por edificio

            if (this.search1) {

                result = result.filter(row =>
                    String(row.edificio)
                        .toLowerCase()
                        .includes(this.search1.toLowerCase())
                );

            }

            // Buscar general

            if (this.search2) {

                result = result.filter(row =>
                    Object.values(row)
                        .join(" ")
                        .toLowerCase()
                        .includes(this.search2.toLowerCase())
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

                const response = await api.get("/equipos-video");

                this.equipos = response.data;

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
                row.modelo ||
                row.no_serie ||
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