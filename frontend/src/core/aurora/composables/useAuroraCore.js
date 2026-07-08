import { ref } from "vue";

/* ======================================
   VARIABLES
====================================== */

const clickCount = ref(0);

let timer = null;

/* ======================================
   COMPOSABLE
====================================== */

export function useAuroraCore() {

    function registerClick() {

        // Si pasan más de 2 segundos se reinicia
        clearTimeout(timer);

        clickCount.value++;

        console.clear();

        console.log("==================================");
        console.log("        AURORA CORE");
        console.log("==================================");
        console.log(`Clicks: ${clickCount.value}`);

        timer = setTimeout(() => {

            clickCount.value = 0;

            console.clear();

            console.log("==================================");
            console.log("        AURORA CORE");
            console.log("==================================");
            console.log("Tiempo agotado");
            console.log("Clicks reiniciados");

        }, 2000);

    }

    return {

        registerClick,

        clickCount

    };

}