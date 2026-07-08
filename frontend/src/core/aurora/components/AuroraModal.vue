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

            <!-- ======================================
                 HEADER
            ======================================= -->

            <h2 class="title">

                Aurora Core

            </h2>

            <p class="subtitle">

                ¿Quién eres?

            </p>

            <!-- ======================================
                 INPUT
            ======================================= -->

            <input

                v-model="answer"

                class="aurora-input"

                type="password"

                placeholder="Respuesta..."

            >

            <!-- ======================================
                 BUTTONS
            ======================================= -->

            <div class="buttons">

                <button
                    class="btn-cancel"
                    @click="cancel"
                >

                    Cancelar

                </button>

                <button
                    class="btn-send"
                    @click="send"
                >

                    Enviar

                </button>

            </div>

        </div>

    </div>

</template>

<script>

import { ref } from "vue";
import { useAuroraCore } from "../composables/useAuroraCore";

export default {

    setup() {

        const answer = ref("");

        const AURORA_KEY = "Aurora";

        const {

            showModal,

            closeModal

        } = useAuroraCore();

        function send() {

            console.clear();

            console.log("==================================");
            console.log("        AURORA CORE");
            console.log("==================================");

            if (answer.value.trim() === AURORA_KEY) {

                console.log("Aurora Core autorizado");

                answer.value = "";

                closeModal();

                return;

            }

            console.log("Respuesta incorrecta");

            cancel();

        }

        function cancel() {

            answer.value = "";

            closeModal();

        }

        return {

            answer,

            showModal,

            closeModal,

            send,

            cancel

        };

    }

};

</script>

<style scoped>

/* ======================================
   OVERLAY
====================================== */

.aurora-overlay{

    position:fixed;

    inset:0;

    display:flex;

    justify-content:center;

    align-items:center;

    background:rgba(0,0,0,.75);

    z-index:99999;

}

/* ======================================
   MODAL
====================================== */

.aurora-modal{

    width:420px;

    background:#020617;

    border:1px solid #334155;

    border-radius:12px;

    padding:30px;

    color:white;

    box-shadow:0 0 30px rgba(0,0,0,.45);

}

/* ======================================
   HEADER
====================================== */

.title{

    margin:0;

    font-size:26px;

    text-align:center;

}

.subtitle{

    margin:18px 0;

    text-align:center;

    color:#cbd5e1;

}

/* ======================================
   INPUT
====================================== */

.aurora-input{

    width:100%;

    padding:12px;

    border-radius:6px;

    border:1px solid #475569;

    background:#0f172a;

    color:white;

    outline:none;

}

.aurora-input:focus{

    border-color:#60a5fa;

}

/* ======================================
   BUTTONS
====================================== */

.buttons{

    display:flex;

    justify-content:flex-end;

    gap:12px;

    margin-top:24px;

}

.btn-send{

    padding:10px 18px;

    cursor:pointer;

}

.btn-cancel{

    padding:10px 18px;

    cursor:pointer;

}

</style>