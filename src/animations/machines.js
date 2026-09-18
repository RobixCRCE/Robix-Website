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

    const mm =
        gsap.matchMedia();


    mm.add(
        "(min-width: 769px)",
        () => {

            const horizontal =
                gsap.to(
                    track,
                    {
                        xPercent:
                            -100 *
                            (total - 1),

                        ease: "none",

                        scrollTrigger: {
                            trigger:
                                section,

                            start:
                                "top top",

                            end: () =>
                                "+=" +
                                window.innerWidth *
                                (total - 1),

                            pin: true,

                            scrub: 1,

                            anticipatePin: 1,

                            invalidateOnRefresh:
                                true,

                            onUpdate: self => {
                                if (counter) {
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
                    }
                );


            /* =========================================
               SCAN EFFECT FOR EACH MACHINE (DESKTOP)
               ========================================= */

            cards.forEach(
                (card) => {
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
                                y: "50vh",
                                duration: 1.2,
                                ease: "power1.inOut"
                            }
                        )
                        .to(
                            scan,
                            {
                                opacity: 0,
                                duration: 0.2
                            }
                        );
                }
            );


            return () => {
                horizontal.kill();
            };

        }
    );

    mm.add(
        "(max-width: 768px)",
        () => {

            gsap.set(
                track,
                {
                    clearProps:
                        "all"
                }
            );


            gsap.set(
                cards,
                {
                    clearProps:
                        "all"
                }
            );


            ScrollTrigger.refresh();

        }
    );



    /* =========================================
       VIEW MODE SWITCHER (ACTUAL / CAD / BLUEPRINT)
       ========================================= */

    cards.forEach(card => {
        const frame = card.querySelector("[data-machine-viewer]");
        if (!frame) return;

        const buttons = card.querySelectorAll("[data-set-view]");
        const images = card.querySelectorAll(".machine-view-image");
        const modeLabel = card.querySelector(".mode-label");
        const scan = card.querySelector(".machine-scan");
        const fallback = frame.querySelector(".machine-fallback");

        // Preload CAD and Blueprint images for instant switching
        images.forEach(img => {
            if (img.src) {
                const pre = new Image();
                pre.src = img.src;
            }

            img.addEventListener("error", () => {
                console.error("ROBIX machine asset failed:", img.src);
                if (fallback) {
                    fallback.style.display = "flex";
                }
            });
        });

        let currentMode = "actual";

        buttons.forEach(btn => {
            btn.addEventListener("click", event => {
                event.preventDefault();
                event.stopPropagation();

                const targetMode = btn.getAttribute("data-set-view");
                if (targetMode === currentMode) return;

                const currentImage = card.querySelector(`.machine-view-image[data-view="${currentMode}"]`);
                const nextImage = card.querySelector(`.machine-view-image[data-view="${targetMode}"]`);

                if (!nextImage) return;

                buttons.forEach(b => b.classList.toggle("active", b === btn));
                frame.setAttribute("data-mode", targetMode);

                if (modeLabel) {
                    modeLabel.textContent = `VIEW // ${targetMode.toUpperCase()}`;
                }

                const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

                // Animate scan line if present and reduced motion not preferred
                if (scan && !prefersReduced) {
                    gsap.fromTo(
                        scan,
                        { opacity: 0, y: 0 },
                        {
                            opacity: 1,
                            duration: 0.1,
                            onComplete: () => {
                                gsap.to(scan, {
                                    y: "40vh",
                                    duration: 0.45,
                                    ease: "power2.inOut",
                                    onComplete: () => {
                                        gsap.to(scan, {
                                            opacity: 0,
                                            duration: 0.15,
                                            onComplete: () => {
                                                gsap.set(scan, { y: 0 });
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    );
                }

                if (prefersReduced) {
                    if (currentImage) {
                        currentImage.classList.remove("active");
                        gsap.set(currentImage, { opacity: 0, visibility: "hidden" });
                    }
                    nextImage.classList.add("active");
                    gsap.set(nextImage, { opacity: 1, visibility: "visible" });
                } else {
                    if (currentImage) {
                        gsap.to(currentImage, {
                            opacity: 0,
                            scale: 1.015,
                            duration: 0.2,
                            ease: "power2.in",
                            overwrite: "auto",
                            onComplete: () => {
                                currentImage.classList.remove("active");
                                gsap.set(currentImage, { visibility: "hidden" });
                            }
                        });
                    }

                    nextImage.classList.add("active");
                    gsap.set(nextImage, { visibility: "visible" });

                    gsap.fromTo(
                        nextImage,
                        {
                            opacity: 0,
                            scale: 0.99,
                            filter: "brightness(1.35)"
                        },
                        {
                            opacity: 1,
                            scale: 1,
                            filter: "brightness(1)",
                            duration: 0.34,
                            ease: "power3.out",
                            overwrite: "auto"
                        }
                    );
                }

                currentMode = targetMode;
            });
        });
    });

}