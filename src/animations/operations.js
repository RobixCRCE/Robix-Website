import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
    ScrollTrigger
);



export function initOperations() {

    const section =
        document.querySelector(
            "#operations"
        );


    if (!section) {
        return;
    }


    const operations =
        gsap.utils.toArray(
            ".operation"
        );


    const current =
        document.querySelector(
            ".ops-current"
        );



    /* =========================================
       INITIAL STATES
       ========================================= */

    operations.forEach(
        (operation, index) => {

            if (index === 0) {

                gsap.set(
                    operation,
                    {
                        opacity: 1,
                        visibility: "visible",
                        x: 0
                    }
                );

            }

            else {

                gsap.set(
                    operation,
                    {
                        opacity: 0,
                        visibility: "hidden",
                        x: 70
                    }
                );

            }

        }
    );



    /* =========================================
       MASTER TIMELINE
       ========================================= */

    const tl =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    section,

                start:
                    "top top",

                end:
                    "+=2800",

                pin:
                    true,

                scrub:
                    1,

                anticipatePin:
                    1

            }

        });



    /* =========================================
       TRANSFORM BETWEEN OPERATIONS
       ========================================= */


    for (
        let i = 0;
        i < operations.length - 1;
        i++
    ) {

        const currentOperation =
            operations[i];


        const nextOperation =
            operations[i + 1];


        const label =
            `operation-${i}`;



        /*
         * Current content disengages.
         */

        tl.to(

            currentOperation,

            {

                opacity: 0,

                x: -70,

                duration: 0.35,

                ease:
                    "power2.in",

                onComplete: () => {

                    currentOperation.style.visibility =
                        "hidden";

                },

                onReverseComplete: () => {

                    currentOperation.style.visibility =
                        "visible";

                }

            },

            label

        );



        /*
         * Mechanical core twists.
         */

        tl.to(

            ".ops-machine-core",

            {

                rotation:
                    135 + i * 90,

                scale:
                    0.82,

                duration:
                    0.25,

                ease:
                    "power3.in"

            },

            label

        );



        /*
         * Arms briefly separate.
         */

        tl.to(

            ".arm-left",

            {

                x: -35,

                duration:
                    0.25

            },

            label

        );


        tl.to(

            ".arm-right",

            {

                x: 35,

                duration:
                    0.25

            },

            label

        );



        /*
         * Next operation deploys.
         */

        tl.set(

            nextOperation,

            {

                visibility:
                    "visible"

            }

        );


        tl.to(

            nextOperation,

            {

                opacity: 1,

                x: 0,

                duration: 0.45,

                ease:
                    "power3.out",

                onStart: () => {

                    current.textContent =
                        String(i + 2)
                            .padStart(
                                2,
                                "0"
                            );

                },

                onReverseComplete: () => {

                    current.textContent =
                        String(i + 1)
                            .padStart(
                                2,
                                "0"
                            );

                }

            }

        );



        /*
         * Core locks into next mode.
         */

        tl.to(

            ".ops-machine-core",

            {

                rotation:
                    45 +
                    (i + 1) * 90,

                scale:
                    1,

                duration:
                    0.3,

                ease:
                    "back.out(1.6)"

            },

            "<"

        );



        /*
         * Arms reconnect.
         */

        tl.to(

            ".arm-left",

            {

                x: 0,

                duration:
                    0.25,

                ease:
                    "power3.out"

            },

            "<"

        );


        tl.to(

            ".arm-right",

            {

                x: 0,

                duration:
                    0.25,

                ease:
                    "power3.out"

            },

            "<"

        );



        /*
         * Progress indicator.
         */

        tl.to(

            ".ops-progress-fill",

            {

                width:
                    `${(i + 2) * 25}%`,

                duration:
                    0.25

            },

            "<"

        );

    }



    /* =========================================
       CONSTANT MACHINE MOTION
       ========================================= */

    gsap.to(

        ".ops-ring-1",

        {

            rotation: 360,

            duration: 55,

            repeat: -1,

            ease: "none"

        }

    );


    gsap.to(

        ".ops-ring-2",

        {

            rotation: -360,

            duration: 42,

            repeat: -1,

            ease: "none"

        }

    );

}