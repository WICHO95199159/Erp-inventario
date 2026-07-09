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

        <div
            ref="modalRef"
            class="aurora-modal"
        >

            <!-- ======================================
                 LOGIN
            ======================================= -->

            <template v-if="currentState === AURORA_STATES.LOGIN">

                <!-- HEADER -->

                <h2 class="title-login">

                    Secret Core

                </h2>

                <p class="subtitle">

                    ¿Quién eres?

                </p>

                <!-- INPUT -->

                <input

                    v-model="answer"

                    class="aurora-input"

                    type="password"

                    placeholder="Respuesta..."

                >

                <!-- BUTTONS -->

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

            </template>

            <!-- ======================================
                 BOOT
            ======================================= -->

            <template v-else-if="currentState === AURORA_STATES.BOOT">

                <h2 class="title">

                    Aurora Core

                </h2>

                <p class="subtitle">

                    Initializing...

                </p>

                <div class="boot-list">

                    <p
                        v-for="message in bootMessages"
                        :key="message"
                    >

                        {{ message }}

                    </p>

                </div>

            </template>

            <template v-else-if="currentState === AURORA_STATES.MATRIX">

                <MatrixScreen />

            </template>

            <template v-else-if="currentState === AURORA_STATES.TERMINAL">

                <h2 class="title">

                    Aurora Core

                </h2>

                <div class="terminal">

                    <div
                        v-for="(line, index) in terminalHistory"
                        :key="index"
                    >

                        {{ line }}

                    </div>

                    <div class="terminal-input">

                        <span>></span>

                        <input

                            v-model="terminalInput"

                            class="command-input"

                            @keyup.enter="executeCommand"

                            autofocus

                        >

                    </div>

                </div>

            </template>

        </div>

    </div>

</template>

<script>

import { ref, watch, nextTick } from "vue";
import { useAuroraCore } from "../composables/useAuroraCore";
import { AURORA_STATES } from "../states/auroraStates";
import { terminalHistory } from "../terminal/history";
import { dispatchCommand } from "../services/commandDispatcher";
import MatrixScreen from "./MatrixScreen.vue";

import { shake, fadeOut, wait, fadeIn } from "../utils/animations";

export default {

    components: {

        MatrixScreen

    },

    setup() {

        const answer = ref("");

        const terminalInput = ref("");

        const currentState = ref(AURORA_STATES.LOGIN);

        const bootMessages = ref([]);

        const modalRef = ref(null);

        const bootSequence = [

            "Loading Inventory Module",

            "Loading Network Module",

            "Loading Workspace Module",

            "Loading Security Module",

            "Loading Aurora Kernel...",

            ".........................",

            "Please wait..............",

            "Load completed..........",

            "Login Success............",

            "Starting Aurora Kernel...",

            "Welcome..................",

            "Again....................."

        ];

        const AURORA_KEY = "Aurora";

        const {

            showModal,

            closeModal

        } = useAuroraCore();
        
        watch(

    showModal,

        async (visible) => {

                if (!visible) return;

                await nextTick();

                await fadeIn(

                    modalRef.value

                );

            }

        );

        async function send() {

            console.clear();

            console.log("==================================");
            console.log("        AURORA CORE");
            console.log("==================================");

            if (answer.value.trim() === AURORA_KEY) {

                console.log("Aurora Core autorizado");

                answer.value = "";

                currentState.value = AURORA_STATES.BOOT;

                startBoot();

                return;

            }else{

                    await shake(modalRef.value);
                    await cancel();

                }

        }

        async function cancel(animated = false){

            answer.value = "";

            if(animated){

                await wait(900);

            }

            await fadeOut(modalRef.value);

            closeModal();

        }

        async function startBoot() {

            bootMessages.value = [];

            for (const message of bootSequence) {

                await new Promise(resolve => setTimeout(resolve, 800));

                bootMessages.value.push(message);

            }

            // Espera un momento para que se lean los últimos mensajes
            await new Promise(resolve => setTimeout(resolve, 800));

            // Ahora sí pasa a Matrix
            currentState.value = AURORA_STATES.MATRIX;

            startMatrix();

        }

        async function printLines(lines, delay = 1200) {

            for(const line of lines){

                await new Promise(resolve =>

                    setTimeout(resolve, delay)

                );

                terminalHistory.value.push(line);

            }

        }
        
        async function executeCommand() {

            const command = terminalInput.value.trim();

            if(!command){

                return;

            }

            terminalHistory.value.push("> " + command);

            const response = dispatchCommand(command);

            await printLines(response, 1200);

            terminalInput.value = "";

        }

        async function startMatrix() {

            await new Promise(resolve => setTimeout(resolve, 2500));

            currentState.value = AURORA_STATES.TERMINAL;

        }

        return {

            answer,

            showModal,

            closeModal,

            send,

            cancel,

            currentState,

            AURORA_STATES,

            bootMessages,

            terminalHistory,

            terminalInput,

            executeCommand,

            modalRef,

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

    width:80%;

    height: 80%;

    /* background:#020617; */

    background-image: url("../utils/img/login.jpg");

    border:1px solid #334155;

    border-radius:12px;

    padding:30px;

    color:white;

    box-shadow:0 0 30px rgba(0,0,0,.45);

}

/* ======================================
   HEADER
====================================== */

.title-login{

    margin:0;

    margin-top: 50px;

    font-size:26px;

    text-align:center;

    color:#a855f7;

}

.title{

    margin:0;

    font-size:26px;

    text-align:center;

    color:#a855f7;

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

    width:50%;

    padding:12px;

    border-radius:6px;

    border:1px solid #475569;

    background:#0f172a;

    color:white;

    outline:none;

    margin-left: 25%;

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

    margin-right: 620px;

}

.btn-send{

    padding:10px 18px;

    cursor:pointer;

    height: 49px;

    width: 105px;

    border-radius: 10px;

}

.btn-cancel{

    padding:10px 18px;

    cursor:pointer;

    height: 50px;

    width: 100px;

    border-radius: 10px;

}

/* ======================================
   BOOT
====================================== */

.boot-list{

    margin-top:25px;

    padding:25px;

    background:#0b1120;

    border:1px solid #1e293b;

    border-radius:8px;

    display:flex;

    flex-direction:column;

    gap:10px;

    font-family:Consolas, monospace;

    color:#a855f7;

    text-align:left;

}

/* ======================================
   TERMINAL
====================================== */

.terminal{

    margin-top:30px;

    background:#000;

    border:1px solid #312e81;

    border-radius:8px;

    padding:18px;

    height:60%;

    color:#c084fc;

    font-family:Consolas, monospace;

    text-align:left;

}

.command-input{

    flex:1;

    background:transparent;

    border:none;

    outline:none;

    color:#c084fc;

    font-family:Consolas, monospace;

    font-size:16px;

}

.command-input{

    flex:1;

    background:transparent;

    border:none;

    outline:none;

    color:#c084fc;

    font-family:Consolas, monospace;

    font-size:16px;

}

</style>