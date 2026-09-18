import gsap from "gsap";

import {
    ScrollTrigger
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
    ScrollTrigger
);


export function initMissions() {

    const section =
        document.querySelector(
            "#missions"
        );


    if (!section) {
        return;
    }


    const records =
        gsap.utils.toArray(
            ".mission-record"
        );


    const current =
        document.querySelector(
            ".mission-current"
        );

    const totalEl =
        document.querySelector(
            ".mission-total"
        );


    if (records.length === 0) {
        return;
    }

    if (totalEl) {
        totalEl.textContent =
            String(records.length).padStart(2, "0");
    }

    /*
     * Preload posters and attach error handlers
     */
    const posters = section.querySelectorAll(".mission-poster");
    posters.forEach(img => {
        if (img.src) {
            const pre = new Image();
            pre.src = img.src;
        }

        img.addEventListener("error", () => {
            console.error("ROBIX mission poster failed:", img.src);
            const frame = img.closest(".mission-image-frame");
            if (frame) {
                img.style.display = "none";
                const fallback = frame.querySelector(".mission-fallback");
                if (fallback) {
                    fallback.style.display = "block";
                }
            }
        });
    });


    const mm = gsap.matchMedia();

    mm.add(
        "(min-width: 769px)",
        () => {
            /*
             * Set starting states.
             */
            records.forEach(
                (record, index) => {
                    if (index === 0) {
                        gsap.set(
                            record,
                            {
                                opacity: 1,
                                visibility: "visible",
                                x: 0
                            }
                        );
                    }
                    else {
                        gsap.set(
                            record,
                            {
                                opacity: 0,
                                visibility: "hidden",
                                x: 80
                            }
                        );
                    }
                }
            );

            /*
             * Set initial progress fill.
             */
            gsap.set(
                ".mission-counter-fill",
                {
                    width: `${(1 / records.length) * 100}%`
                }
            );

            /*
             * Master pinned archive.
             */
            const timeline =
                gsap.timeline({
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: `+=${records.length * 850}`,
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        invalidateOnRefresh: true
                    }
                });



    /*
     * Transition through each mission.
     */

    for (
        let i = 0;
        i < records.length - 1;
        i++
    ) {

        const outgoing =
            records[i];


        const incoming =
            records[i + 1];


        const label =
            `mission-${i}`;



        /*
         * Close archive shutters.
         */

        timeline.to(
            ".shutter-top",
            {
                yPercent: -100,
                duration: 0.28,
                ease: "power4.out"
            }
        );

        timeline.to(
            ".shutter-bottom",
            {
                yPercent: 100,
                duration: 0.28,
                ease: "power4.out"
            },
            "<"
        );



        /*
         * Swap records while covered.
         */

        timeline.set(

            outgoing,

            {

                opacity: 0,

                visibility:
                    "hidden",

                x: -80

            }

        );


        timeline.set(

            incoming,

            {

                opacity: 1,

                visibility:
                    "visible",

                x: 80

            }

        );



        /*
         * Update counter.
         */

        timeline.call(
            () => {

                current.textContent =
                    String(i + 2)
                        .padStart(
                            2,
                            "0"
                        );

            }
        );



        /*
         * Open shutters.
         */

        timeline.to(

            ".shutter-top",

            {

                yPercent: 0,

                duration: 0.28,

                ease:
                    "power4.out"

            }

        );


        timeline.to(

            ".shutter-bottom",

            {

                yPercent: 0,

                duration: 0.28,

                ease:
                    "power4.out"

            },

            "<"

        );



        /*
         * Deploy new record.
         */

        timeline.to(

            incoming,

            {

                x: 0,

                duration: 0.38,

                ease:
                    "power3.out"

            },

            "<"

        );

        /*
         * Subtle poster entrance animation.
         */
        const incomingPoster = incoming.querySelector(".mission-poster");
        if (incomingPoster) {
            timeline.fromTo(
                incomingPoster,
                {
                    opacity: 0.85,
                    scale: 0.975
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration: 0.4,
                    ease: "power3.out"
                },
                "<"
            );
        }



        /*
         * Progress bar.
         */

        timeline.to(

            ".mission-counter-fill",

            {

                width:
                    `${((i + 2) / records.length) * 100}%`,

                duration:
                    0.25

            },

            "<"

        );



        /*
         * Scan newly loaded image.
         */

        const scan =
            incoming.querySelector(
                ".mission-scan"
            );


        if (scan) {

            timeline.fromTo(

                scan,

                {

                    opacity: 0,

                    y: 0

                },

                {

                    opacity: 1,

                    y:
                        "44vh",

                    duration:
                        0.62,

                    ease:
                        "power1.inOut"

                },

                "<+.05"

            );


            timeline.to(

                scan,

                {

                    opacity: 0,

                    duration:
                        0.12

                }

            );

        }

    }

    return () => {
        timeline.kill();
    };

});

mm.add(
    "(max-width: 768px)",
    () => {
        gsap.set(
            ".mission-record",
            {
                clearProps: "all"
            }
        );

        gsap.set(
            ".archive-shutter",
            {
                display: "none"
            }
        );

        ScrollTrigger.refresh();
    }
);



    /*
     * Refresh after loader disappears.
     */

    window.addEventListener(
        "robix:introComplete",
        () => {
            ScrollTrigger.refresh();
        },
        {
            once: true
        }
    );

}