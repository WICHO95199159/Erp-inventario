/* ======================================
   MATRIX RAIN
====================================== */

export function startMatrix(canvas) {

    const ctx = canvas.getContext("2d");

    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;

    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    const fontSize = 16;

    const columns = Math.floor(canvas.width / fontSize);

    const drops = [];

    for(let i = 0; i < columns; i++){

        drops[i] = Math.random() * canvas.height;

    }

    function draw(){

        ctx.fillStyle = "rgba(0,0,0,0.08)";
        ctx.fillRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

        ctx.font = `${fontSize}px Consolas`;

        for(let i = 0; i < drops.length; i++){

            const text =

                characters[
                    Math.floor(
                        Math.random() * characters.length
                    )
                ];

            /*
            Cabeza blanca
            */

            ctx.fillStyle = "#ffffff";

            ctx.fillText(

                text,

                i * fontSize,

                drops[i]

            );

            /*
            Cola morada
            */

            ctx.fillStyle = "#a855f7";

            ctx.fillText(

                text,

                i * fontSize,

                drops[i] - fontSize

            );

            /*
            Cola oscura
            */

            ctx.fillStyle = "#6d28d9";

            ctx.fillText(

                text,

                i * fontSize,

                drops[i] - fontSize * 2

            );

            drops[i] += fontSize;

            if(

                drops[i] >

                canvas.height +

                Math.random() * 500

            ){

                drops[i] = 0;

            }

        }

        requestAnimationFrame(draw);

    }

    draw();

}