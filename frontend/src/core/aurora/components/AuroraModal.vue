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
                 LOGIN
            ======================================= -->

            <template v-if="currentState === AURORA_STATES.LOGIN">

                <!-- HEADER -->

                <h2 class="title">

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

                        ✔ {{ message }}

                    </p>

                </div>

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

import { ref } from "vue";
import { useAuroraCore } from "../composables/useAuroraCore";
import { AURORA_STATES } from "../states/auroraStates";
import { terminalHistory } from "../terminal/history";
import { dispatchCommand } from "../services/commandDispatcher";

export default {

    setup() {

        const answer = ref("");

        const terminalInput = ref("");

        const currentState = ref(AURORA_STATES.LOGIN);

        const bootMessages = ref([]);

        const bootSequence = [

            "Loading Inventory Module",

            "Loading Network Module",

            "Loading Workspace Module",

            "Loading Security Module",

            "Starting Aurora Kernel..."

        ];

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

                currentState.value = AURORA_STATES.BOOT;

                startBoot();

                return;

            }

            console.log("Respuesta incorrecta");

            cancel();

        }

        function cancel() {

            answer.value = "";

            closeModal();

        }

        async function startBoot() {

            bootMessages.value = [];

            for (const message of bootSequence) {

                await new Promise(resolve => setTimeout(resolve, 500));

                bootMessages.value.push(message);

            }

            await new Promise(resolve => setTimeout(resolve, 800));

            currentState.value = AURORA_STATES.TERMINAL;

        }

        function executeCommand() {

            const command = terminalInput.value.trim();

            if (!command) {

                return;

            }

            terminalHistory.value.push("> " + command);

            const response = dispatchCommand(command);

            response.forEach(line => {

                terminalHistory.value.push(line);

            });

            terminalInput.value = "";

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

/* ======================================
   BOOT
====================================== */

.boot-list{

    margin-top:25px;

    display:flex;

    flex-direction:column;

    gap:10px;

    font-family:Consolas, monospace;

    color:#22c55e;

}

/* ======================================
   TERMINAL
====================================== */

.terminal{

    margin-top:30px;

    background:#000;

    border-radius:6px;

    padding:18px;

    min-height:180px;

    color:#22c55e;

    font-family:Consolas, monospace;

}

.terminal-input{

    display:flex;

    align-items:center;

    gap:8px;

    margin-top:12px;

    color:#22c55e;

}

.command-input{

    flex:1;

    background:transparent;

    border:none;

    outline:none;

    color:#22c55e;

    font-family:Consolas, monospace;

    font-size:16px;

}

</style>