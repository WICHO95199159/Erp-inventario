/* ======================================
   WAIT
====================================== */

export function wait(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

/* ======================================
   FADE OUT
====================================== */

export async function fadeOut(element) {

    if (!element) return;

    element.style.transition = "opacity .45s ease";

    element.style.opacity = "0";

    await wait(800);

}

/* ======================================
   FADE IN
====================================== */

export async function fadeIn(element) {

    if (!element) return;

    element.style.opacity = "0";

    element.style.transition = "opacity .45s ease";

    requestAnimationFrame(() => {

        element.style.opacity = "1";

    });

    await wait(1200);

}

/* ======================================
   SHAKE
====================================== */

export async function shake(element) {

    if (!element) return;

    element.animate(

        [
            { transform: "translateX(0)" },

            { transform: "translateX(-6px)" },

            { transform: "translateX(6px)" },

            { transform: "translateX(-4px)" },

            { transform: "translateX(4px)" },

            { transform: "translateX(-2px)" },

            { transform: "translateX(2px)" },

            { transform: "translateX(0)" }

        ],

        {

            duration: 400

        }

    );

    await wait(400);

}