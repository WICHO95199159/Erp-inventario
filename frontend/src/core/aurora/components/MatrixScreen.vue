<template>

    <canvas
        ref="matrixCanvas"
        class="matrix-canvas"
    />

</template>

<script>

import { ref, onMounted } from "vue";

import { startMatrix } from "../effects/matrixRain";

export default {

    setup() {

        const matrixCanvas = ref(null);

        onMounted(() => {

            startMatrix(matrixCanvas.value);

        });

        return {

            matrixCanvas

        };

    }

};

</script>

<style scoped>

.matrix-canvas{

    width:100%;

    height:650px;

    display:block;

    background:black;

    border-radius:6px;

}

</style>