<template>

    <!-- ======================================
         OVERLAY
    ======================================= -->

    <div
        v-if="showModal"
        class="aurora-overlay"
    >

        <!-- ======================================
             MODAL
        ======================================= -->

        <div class="aurora-modal">

            <h2>

                ¿Quién eres?

            </h2>

            <input
                v-model="answer"
                placeholder="Respuesta..."
            >

            <div class="buttons">

                <button
                    class="btn-send"
                >

                    Enviar

                </button>

                <button
                    class="btn-cancel"
                    @click="closeModal"
                >

                    Cancelar

                </button>

            </div>

        </div>

    </div>

</template>

<script setup>

import { ref } from "vue";

const answer = ref("");

const showModal = false;

function closeModal() {}

</script>

<style scoped>

/* ======================================
   OVERLAY
====================================== */

.aurora-overlay{

    position:fixed;

    inset:0;

    background:rgba(0,0,0,.75);

    display:flex;

    justify-content:center;

    align-items:center;

    z-index:99999;

}

/* ======================================
   MODAL
====================================== */

.aurora-modal{

    width:380px;

    background:#0f172a;

    border:1px solid #334155;

    border-radius:12px;

    padding:30px;

    color:white;

}

/* ======================================
   INPUT
====================================== */

input{

    width:100%;

    margin-top:20px;

    padding:12px;

    background:#020617;

    color:white;

    border:1px solid #475569;

    border-radius:6px;

}

/* ======================================
   BOTONES
====================================== */

.buttons{

    display:flex;

    justify-content:flex-end;

    gap:10px;

    margin-top:20px;

}

.btn-send{

    padding:10px 20px;

}

.btn-cancel{

    padding:10px 20px;

}

</style>