import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
    ScrollTrigger
);



export function initContact() {

    const section =
        document.querySelector(
            "#contact"
        );


    if (!section) {
        return;
    }



    /* =========================================
       INITIAL STATES
       ========================================= */

    gsap.set(
        ".contact-kicker",
        {
            opacity: 0,
            y: 15
        }
    );


    gsap.set(
        ".contact-title span",
        {
            opacity: 0,
            y: 80
        }
    );


    gsap.set(
        ".contact-description",
        {
            opacity: 0,
            y: 25
        }
    );


    gsap.set(
        ".contact-cta",
        {
            opacity: 0,
            y: 20
        }
    );


    gsap.set(
        ".contact-channel",
        {
            opacity: 0,
            x: 40
        }
    );


    gsap.set(
        ".contact-core",
        {
            opacity: 0,
            scale: 0.75,
            rotation: 12
        }
    );


    gsap.set(
        ".contact-status",
        {
            opacity: 0
        }
    );



    /* =========================================
       ENTRANCE TIMELINE
       ========================================= */

    const tl =
        gsap.timeline({

            scrollTrigger: {

                trigger:
                    section,

                start:
                    "top 55%",

                once:
                    true

            }

        });



    tl.to(
        ".contact-core",
        {
            opacity: 1,

            scale: 1,

            rotation: 0,

            duration: 1.15,

            ease:
                "power4.out"
        }
    );


    tl.to(
        ".contact-status",
        {
            opacity: 1,

            duration: 0.3
        },

        "-=.75"
    );


    tl.to(
        ".contact-kicker",
        {
            opacity: 1,

            y: 0,

            duration: 0.35
        },

        "-=.65"
    );


    tl.to(
        ".contact-title span",
        {
            opacity: 1,

            y: 0,

            duration: 0.65,

            stagger: 0.09,

            ease:
                "power4.out"
        },

        "-=.5"
    );


    tl.to(
        ".contact-description",
        {
            opacity: 1,

            y: 0,

            duration: 0.45
        },

        "-=.28"
    );


    tl.to(
        ".contact-cta",
        {
            opacity: 1,

            y: 0,

            duration: 0.4
        },

        "-=.2"
    );


    tl.to(
        ".contact-channel",
        {
            opacity: 1,

            x: 0,

            duration: 0.4,

            stagger: 0.07,

            ease:
                "power3.out"
        },

        "-=.3"
    );



    /* =========================================
       AMBIENT CORE MOTION
       ========================================= */

    gsap.to(
        ".contact-core .ring-a",
        {
            rotation: 360,

            duration: 70,

            repeat: -1,

            ease: "none",

            transformOrigin:
                "50% 50%"
        }
    );


    gsap.to(
        ".contact-core .ring-b",
        {
            rotation: -360,

            duration: 50,

            repeat: -1,

            ease: "none",

            transformOrigin:
                "50% 50%"
        }
    );


    gsap.to(
        ".contact-core .ring-c",
        {
            rotation: 360,

            duration: 34,

            repeat: -1,

            ease: "none",

            transformOrigin:
                "50% 50%"
        }
    );



    /* =========================================
       CORE PULSE
       ========================================= */

    gsap.to(
        ".contact-core-center",
        {
            boxShadow:
                "0 0 85px rgba(255,40,40,0.22)",

            duration: 1.8,

            repeat: -1,

            yoyo: true,

            ease:
                "sine.inOut"
        }
    );



    /* =========================================
       STATUS DOT
       ========================================= */

    gsap.to(
        ".status-dot",
        {
            opacity: 0.35,

            duration: 0.8,

            repeat: -1,

            yoyo: true,

            ease:
                "sine.inOut"
        }
    );

}