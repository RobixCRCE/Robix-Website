import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";

import {
    initForm
} from "@formspree/ajax/dist/index.mjs";


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
       FORMSpree
       ========================================= */

    const contactForm =
        document.querySelector(
            "#robix-contact-form"
        );


    if (contactForm) {

        initForm({

            formElement:
                "#robix-contact-form",

            formId:
                "mgoqpyky",

            data: {

                source:
                    "ROBIX Website V2"

            }

        });

    }



    /* =========================================
       CONTACT ENTRANCE
       ========================================= */

    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        gsap.set(".contact-header", { opacity: 0, y: 25 });
        gsap.set(".contact-brand", { opacity: 0, x: -45 });
        gsap.set(".contact-location", { opacity: 0, y: 35 });
        gsap.set(".contact-form-panel", { opacity: 0, x: 45 });
        gsap.set(".contact-divider", {
            opacity: 0,
            scaleY: 0,
            transformOrigin: "50% 50%"
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 65%",
                once: true
            }
        });

        tl.to(".contact-header", {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: "power3.out"
        });

        tl.to(".contact-divider", {
            opacity: 1,
            scaleY: 1,
            duration: 0.7,
            ease: "power3.out"
        }, "-=.2");

        tl.to(".contact-brand", {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out"
        }, "-=.45");

        tl.to(".contact-location", {
            opacity: 1,
            y: 0,
            duration: 0.65,
            ease: "power3.out"
        }, "-=.5");

        tl.to(".contact-form-panel", {
            opacity: 1,
            x: 0,
            duration: 0.65,
            ease: "power3.out"
        }, "-=.5");
    });

    mm.add("(max-width: 768px)", () => {
        gsap.set(".contact-header, .contact-brand, .contact-location, .contact-form-panel", {
            opacity: 0,
            y: 20,
            x: 0
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                once: true
            }
        });

        tl.to(".contact-header", {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
        });

        tl.to(".contact-brand", {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
        }, "-=.25");

        tl.to(".contact-location", {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
        }, "-=.25");

        tl.to(".contact-form-panel", {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: "power3.out"
        }, "-=.25");
    });



    /* =========================================
       RADAR SWEEP
       ========================================= */

    gsap.to(
        ".radar-sweep",
        {
            rotation: 360,

            duration: 5,

            repeat: -1,

            ease: "none",

            transformOrigin:
                "0% 0%"
        }
    );



    /* =========================================
       LOCATION PULSE
       ========================================= */

    gsap.to(
        ".location-pulse",
        {
            scale: 2.3,

            opacity: 0,

            duration: 1.7,

            repeat: -1,

            ease:
                "power1.out"
        }
    );



    /* =========================================
       ROBIX LOGO GLOW
       ========================================= */

    gsap.to(
        ".contact-logo",
        {
            filter:
                "drop-shadow(0 0 9px rgba(255,255,255,.22)) " +
                "drop-shadow(0 0 27px rgba(255,35,35,.32))",

            duration: 1.8,

            repeat: -1,

            yoyo: true,

            ease:
                "sine.inOut"
        }
    );

}