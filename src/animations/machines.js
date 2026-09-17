import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
    ScrollTrigger
);


export function initMachines() {

    const section =
        document.querySelector("#machines");


    const track =
        document.querySelector(
            ".machines-track"
        );


    const cards =
        gsap.utils.toArray(
            ".machine-card"
        );


    const counter =
        document.querySelector(
            ".machine-current"
        );


    if (
        !section ||
        !track ||
        cards.length === 0
    ) {
        return;
    }



    const total =
        cards.length;



    /* =========================================
       HORIZONTAL MACHINE DATABASE
       ========================================= */

    const horizontal =
        gsap.to(

            track,

            {

                xPercent:
                    -100 *
                    (total - 1),

                ease:
                    "none",

                scrollTrigger: {

                    trigger:
                        section,

                    start:
                        "top top",

                    end: () =>
                        "+=" +
                        window.innerWidth *
                        (total - 1),

                    pin:
                        true,

                    scrub:
                        1,

                    anticipatePin:
                        1,

                    invalidateOnRefresh:
                        true,


                    onUpdate: self => {

                        const index =
                            Math.round(

                                self.progress *
                                (total - 1)

                            );


                        counter.textContent =
                            String(
                                index + 1
                            ).padStart(
                                2,
                                "0"
                            );

                    }

                }

            }

        );



    /* =========================================
       SCAN EFFECT FOR EACH MACHINE
       ========================================= */

    cards.forEach(
        (card, index) => {

            const scan =
                card.querySelector(
                    ".machine-scan"
                );


            if (!scan) {
                return;
            }


            gsap.timeline({

                scrollTrigger: {

                    trigger:
                        card,

                    containerAnimation:
                        horizontal,

                    start:
                        "left center",

                    end:
                        "right center",

                    toggleActions:
                        "play none none reverse"

                }

            })

                .fromTo(

                    scan,

                    {

                        opacity: 0,

                        y: 0

                    },

                    {

                        opacity: 1,

                        duration: 0.15

                    }

                )

                .to(

                    scan,

                    {

                        y:
                            "50vh",

                        duration:
                            1.2,

                        ease:
                            "power1.inOut"

                    }

                )

                .to(

                    scan,

                    {

                        opacity: 0,

                        duration:
                            0.2

                    }

                );

        }
    );

}