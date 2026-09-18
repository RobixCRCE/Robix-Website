import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
    ScrollTrigger
);


export function initAboutTransition() {

    const hero =
        document.querySelector("#hero");


    const about =
        document.querySelector(".about-system");


    if (!hero || !about) {
        return;
    }

    window.addEventListener(
        "robix:introComplete",
        () => {
            ScrollTrigger.refresh();
        },
        {
            once: true
        }
    );



    /* =========================================
       ABOUT INITIAL STATES
       ========================================= */

    gsap.set(
        ".about-heading",
        {
            opacity: 0,
            x: -60
        }
    );


    gsap.set(
        ".department",
        {
            opacity: 0,
            scale: 0.82
        }
    );


    gsap.set(
        ".system-core",
        {
            opacity: 0,
            scale: 0.55,
            rotation: 25
        }
    );



    /* =========================================
       SCROLL TRANSFORMATION
       ========================================= */

    const timeline =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    hero,

                start:
                    "top top",

                end:
                    "+=1500",

                pin:
                    true,

                scrub:
                    1,

                anticipatePin:
                    1

            }

        });



    /* =========================================
       01 — REMOVE SCROLL INDICATOR
       ========================================= */

    timeline.to(
        ".hero-scroll",
        {
            opacity: 0,
            duration: 0.12
        }
    );



    /* =========================================
       02 — HERO TEXT DISENGAGES
       ========================================= */

    timeline.to(
        ".hero-copy",
        {
            x: "-14vw",
            opacity: 0,
            scale: 0.94,

            duration: 0.7,

            ease:
                "power2.in"
        },

        "transform"
    );



    /* =========================================
       03 — HERO MACHINE EXPANDS
       ========================================= */

    timeline.to(
        ".hero-machine",
        {
            scale: 1.35,
            opacity: 0,

            duration: 0.8,

            ease:
                "power3.inOut"
        },

        "transform"
    );



    /* =========================================
       04 — ENGINEERING GRID FADES
       ========================================= */

    timeline.to(
        ".hero-grid",
        {
            opacity: 0.07,
            scale: 1.12,

            duration: 0.8
        },

        "transform"
    );



    /* =========================================
       05 — FRAME CHANGES
       ========================================= */

    timeline.to(
        ".frame-top",
        {
            left: "20vw",
            right: "20vw",

            duration: 0.6
        },

        "transform+=0.15"
    );


    timeline.to(
        ".frame-bottom",
        {
            left: "20vw",
            right: "20vw",

            duration: 0.6
        },

        "transform+=0.15"
    );



    /* =========================================
       06 — ABOUT SYSTEM APPEARS
       ========================================= */

    timeline.to(
        ".about-system",
        {
            opacity: 1,

            duration: 0.4
        },

        "about"
    );



    timeline.to(
        ".about-heading",
        {
            opacity: 1,
            x: 0,

            duration: 0.55,

            ease:
                "power3.out"
        },

        "about+=0.1"
    );



    /* =========================================
       07 — CENTRAL CORE ASSEMBLES
       ========================================= */

    timeline.to(
        ".system-core",
        {
            opacity: 1,

            scale: 1,

            rotation: 45,

            duration: 0.65,

            ease:
                "back.out(1.5)"
        },

        "about+=0.22"
    );



    /* =========================================
       08 — DEPARTMENTS DEPLOY
       ========================================= */

    timeline.to(
        ".department",
        {
            opacity: 1,

            scale: 1,

            duration: 0.5,

            stagger: {
                each: 0.08,
                from: "center"
            },

            ease:
                "back.out(1.4)"
        },

        "about+=0.35"
    );



    /* =========================================
       09 — RED SYSTEM LINES POWER UP
       ========================================= */



}