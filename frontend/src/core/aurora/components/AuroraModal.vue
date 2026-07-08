<template>

    <div
        v-if="showModal"
        class="aurora-overlay"
    >

        <div class="aurora-box">

            AURORA CORE ACTIVADO

        </div>

    </div>

</template>

<script>

import { useAuroraCore } from "../composables/useAuroraCore";

export default {

    setup() {

    const {

        showModal

    } = useAuroraCore();

    console.log("AuroraModal montado");

    return {

        showModal

    };

}

};

</script>

<style scoped>

.aurora-overlay{

    position:fixed;

    inset:0;

    display:flex;

    justify-content:center;

    align-items:center;

    background:rgba(0,0,0,.70);

    z-index:99999;

}

.aurora-box{

    background:#991b1b;

    color:white;

    font-size:36px;

    font-weight:bold;

    padding:40px;

    border-radius:12px;

}

</style>