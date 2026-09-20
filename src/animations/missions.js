import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const missions = [
    {
        title: "AUTOMATION EXPO",
        label: "MISSION // 01",
        file: "FILE // 001",
        type: "ROBIX HOSTED EVENT",
        description: "A ROBIX-hosted technical event in Mumbai, created to bring participants together around robotics, engineering and automation.",
        mobileDescription: "A ROBIX-hosted technical event focused on robotics and automation.",
        year: "2025",
        location: "MUMBAI",
        host: "ROBIX",
        status: "ARCHIVED",
        poster: "/Posters_for_events/automation%20expo.jpeg"
    },
    {
        title: "ROBORIFT",
        label: "MISSION // 02",
        file: "FILE // 002",
        type: "ROBIX HOSTED EVENT",
        description: "A ROBIX-hosted event in Mumbai focused on hands-on robotics engagement, technical challenge and applied innovation.",
        mobileDescription: "Hands-on robotics competition focused on engineering and problem-solving.",
        year: "2025",
        location: "MUMBAI",
        host: "ROBIX",
        status: "ARCHIVED",
        poster: "/Posters_for_events/Roborift%202.0%20Poster_page-0001.jpg"
    },
    {
        title: "ROBOTHON",
        label: "MISSION // 03",
        file: "FILE // 003",
        type: "ROBIX HOSTED EVENT",
        description: "A ROBIX-hosted robotics event in Mumbai designed around competition, creative problem-solving and engineering execution.",
        mobileDescription: "A robotics event focused on competition and engineering execution.",
        year: "2025",
        location: "MUMBAI",
        host: "ROBIX",
        status: "ARCHIVED",
        poster: "/Posters_for_events/Robothon.jpeg"
    },
    {
        title: "IDEASPARK",
        label: "MISSION // 04",
        file: "FILE // 004",
        type: "ROBIX HOSTED EVENT",
        description: "A ROBIX-hosted innovation event in Mumbai bringing students together to ideate, build and present technical solutions.",
        mobileDescription: "An innovation event focused on engineering ideas and creativity.",
        year: "2026",
        location: "MUMBAI",
        host: "ROBIX",
        status: "ARCHIVED",
        poster: "/Posters_for_events/idea%20Spark.jpeg"
    },
    {
        title: "IDEASPARK 2.0",
        label: "MISSION // 05",
        file: "FILE // 005",
        type: "ROBIX HOSTED EVENT",
        description: "The next evolution of the IdeaSpark format, hosted by ROBIX in Mumbai to push innovation, teamwork and practical technical thinking.",
        mobileDescription: "The next Ideaspark edition focused on practical innovation and engineering.",
        year: "2026",
        location: "MUMBAI",
        host: "ROBIX",
        status: "ARCHIVED",
        poster: "/Posters_for_events/ideaspark20.jpeg"
    }
];

function getMissionDescription(mission) {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    return (isMobile && mission.mobileDescription) ? mission.mobileDescription : mission.description;
}

const CYBER_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

// Active interval tracking to prevent overlapping scrambles
const activeDecryptIntervals = new Map();

function runCybertronianDecrypt(
    element,
    finalText,
    {
        duration = 500,
        steps = 12,
        tempClass = "cybertronian-temp"
    } = {}
) {
    if (!element) return;

    if (activeDecryptIntervals.has(element)) {
        clearInterval(activeDecryptIntervals.get(element));
        activeDecryptIntervals.delete(element);
    }

    const originalText = finalText || "";
    const maxLength = originalText.length;
    if (maxLength === 0) {
        element.textContent = "";
        element.classList.remove(tempClass);
        return;
    }

    const intervalDuration = duration / steps;
    let iteration = 0;

    element.classList.add(tempClass);

    const interval = setInterval(() => {
        let output = "";

        for (let i = 0; i < maxLength; i++) {
            if (i < iteration) {
                output += originalText[i] || "";
            } else if (originalText[i] === " ") {
                output += " ";
            } else if (originalText[i] === "\n") {
                output += "\n";
            } else {
                output += CYBER_CHARS[
                    Math.floor(Math.random() * CYBER_CHARS.length)
                ];
            }
        }

        element.textContent = output;

        iteration += maxLength / steps;

        if (iteration >= maxLength) {
            clearInterval(interval);
            activeDecryptIntervals.delete(element);
            element.textContent = originalText;
            element.classList.remove(tempClass);
        }
    }, intervalDuration);

    activeDecryptIntervals.set(element, interval);
}

export function initMissions() {
    const section = document.querySelector("#missions");
    if (!section) return;

    // Cache elements
    const posterStage = section.querySelector(".mission-poster-stage");
    const posterCurrent = section.querySelector(".mission-poster-current");
    const posterNext = section.querySelector(".mission-poster-next");
    const scanner = section.querySelector(".mission-scanner");

    if (!posterCurrent || !posterNext || !scanner) return;

    const currentCounter = section.querySelector("[data-mission-current], .mission-current");
    const totalCounter = section.querySelector("[data-mission-total], .mission-total");
    const progressBar = section.querySelector(".mission-counter-fill");

    const missionLabel = section.querySelector(".mission-label, .mission-id");
    const missionType = section.querySelector(".mission-type");
    const missionTitle = section.querySelector(".mission-title") || section.querySelector(".mission-copy h3");
    const missionDescription = section.querySelector(".mission-description") || section.querySelector(".mission-copy > p");
    const missionYear = section.querySelector(".mission-year") || section.querySelector(".mission-data > div:nth-child(1) strong");
    const missionLocation = section.querySelector(".mission-location") || section.querySelector(".mission-data > div:nth-child(2) strong");
    const missionHost = section.querySelector(".mission-host") || section.querySelector(".mission-data > div:nth-child(3) strong");
    const missionStatus = section.querySelector(".mission-status") || section.querySelector(".mission-data > div:nth-child(4) strong");
    const missionFileLabel = section.querySelector(".label-b");

    // Set total counter once
    if (totalCounter) {
        totalCounter.textContent = String(missions.length).padStart(2, "0");
    }

    // Preload posters to eliminate image flash
    missions.forEach(mission => {
        if (!mission.poster) return;
        const img = new Image();
        img.src = mission.poster;
    });

    // State
    let activeMissionIndex = 0;
    let targetMissionIndex = 0;
    let missionTransition = null;
    let isTransitioning = false;

    function triggerMissionDecrypt(mission, nextIndex) {
        if (!mission) return;

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        runCybertronianDecrypt(
            missionLabel,
            `MISSION // ${String(nextIndex + 1).padStart(2, "0")}`,
            { duration: isMobile ? 320 : 260, steps: 8 }
        );

        runCybertronianDecrypt(
            missionType,
            mission.type,
            { duration: isMobile ? 320 : 280, steps: 8 }
        );

        runCybertronianDecrypt(
            missionTitle,
            mission.title.replace(" ", "\n"),
            { duration: isMobile ? 650 : 800, steps: isMobile ? 12 : 16 }
        );

        runCybertronianDecrypt(
            missionDescription,
            getMissionDescription(mission),
            { duration: isMobile ? 750 : 950, steps: isMobile ? 14 : 18 }
        );

        runCybertronianDecrypt(
            missionYear,
            String(mission.year),
            { duration: isMobile ? 480 : 600, steps: isMobile ? 8 : 10 }
        );

        runCybertronianDecrypt(
            missionLocation,
            mission.location,
            { duration: isMobile ? 480 : 220, steps: isMobile ? 8 : 6 }
        );

        runCybertronianDecrypt(
            missionHost,
            mission.host || "ROBIX",
            { duration: isMobile ? 480 : 220, steps: isMobile ? 8 : 6 }
        );

        runCybertronianDecrypt(
            missionStatus,
            mission.status || "ARCHIVED",
            { duration: isMobile ? 480 : 240, steps: isMobile ? 8 : 6 }
        );
    }

    // Direct content update (counters, progress, file label)
    function setMissionContent(index) {
        const mission = missions[index];
        if (!mission) return;

        if (missionFileLabel) {
            missionFileLabel.textContent = mission.file || `FILE // ${String(index + 1).padStart(3, "0")}`;
        }

        if (currentCounter) {
            currentCounter.textContent = String(index + 1).padStart(2, "0");
        }

        if (progressBar) {
            gsap.to(progressBar, {
                width: `${((index + 1) / missions.length) * 100}%`,
                duration: 0.25,
                ease: "power2.out"
            });
        }
    }

    // Set initial text
    function setInitialContent() {
        const mission = missions[0];
        if (!mission) return;

        if (missionLabel) missionLabel.textContent = `MISSION // 01`;
        if (missionType) missionType.textContent = mission.type;
        if (missionTitle) missionTitle.textContent = mission.title.replace(" ", "\n");
        if (missionDescription) missionDescription.textContent = getMissionDescription(mission);
        if (missionYear) missionYear.textContent = mission.year;
        if (missionLocation) missionLocation.textContent = mission.location;
        if (missionHost) missionHost.textContent = mission.host || "ROBIX";
        if (missionStatus) missionStatus.textContent = mission.status || "ARCHIVED";
        if (missionFileLabel) missionFileLabel.textContent = mission.file || "FILE // 001";
        if (currentCounter) currentCounter.textContent = "01";
        if (progressBar) gsap.set(progressBar, { width: `${(1 / missions.length) * 100}%` });
    }

    // Initialize first event
    setInitialContent();
    posterCurrent.src = missions[0].poster;
    posterCurrent.alt = `${missions[0].title} ${missions[0].year} poster`;
    posterNext.src = missions[0].poster;
    posterNext.alt = `${missions[0].title} ${missions[0].year} poster`;
    activeMissionIndex = 0;
    targetMissionIndex = 0;

    gsap.set(posterNext, {
        opacity: 1,
        zIndex: 1
    });

    gsap.set(posterCurrent, {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        zIndex: 2
    });

    gsap.set(scanner, {
        opacity: 0,
        y: 0
    });

    // Zero-gap Scanner Transition
    function showMission(nextIndex) {
        if (nextIndex === activeMissionIndex || isTransitioning || !missions[nextIndex]) {
            return;
        }

        isTransitioning = true;
        const nextMission = missions[nextIndex];

        if (missionTransition) {
            missionTransition.kill();
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (prefersReducedMotion) {
            missionTransition = gsap.timeline({
                defaults: {
                    overwrite: "auto"
                },
                onComplete: () => {
                    posterCurrent.src = nextMission.poster;
                    posterCurrent.alt = `${nextMission.title} ${nextMission.year} poster`;
                    gsap.set(posterCurrent, { opacity: 1, clipPath: "none" });
                    gsap.set(posterNext, { opacity: 0, clipPath: "none" });
                    activeMissionIndex = nextIndex;
                    isTransitioning = false;
                    if (targetMissionIndex !== activeMissionIndex) {
                        showMission(targetMissionIndex);
                    }
                }
            });

            missionTransition
                .to(posterCurrent, { opacity: 0, duration: 0.22, ease: "power1.out" })
                .add(() => {
                    setMissionContent(nextIndex);
                    if (missionLabel) missionLabel.textContent = `MISSION // ${String(nextIndex + 1).padStart(2, "0")}`;
                    if (missionType) missionType.textContent = nextMission.type;
                    if (missionTitle) missionTitle.textContent = nextMission.title.replace(" ", "\n");
                    if (missionDescription) missionDescription.textContent = getMissionDescription(nextMission);
                    if (missionYear) missionYear.textContent = nextMission.year;
                    if (missionLocation) missionLocation.textContent = nextMission.location;
                    if (missionHost) missionHost.textContent = nextMission.host || "ROBIX";
                    if (missionStatus) missionStatus.textContent = nextMission.status || "ARCHIVED";
                    posterNext.src = nextMission.poster;
                    posterNext.alt = `${nextMission.title} ${nextMission.year} poster`;
                })
                .to(posterNext, { opacity: 1, duration: 0.22, ease: "power1.in" });
            return;
        }

        /*
         * Zero-gap wipe:
         * 1. Prime next poster underneath current poster before animation begins.
         */
        posterNext.src = nextMission.poster;
        posterNext.alt = `${nextMission.title} ${nextMission.year} poster`;

        gsap.set(posterNext, {
            opacity: 1,
            zIndex: 1
        });

        gsap.set(posterCurrent, {
            clipPath: "inset(0% 0 0 0)",
            opacity: 1,
            zIndex: 2
        });

        gsap.set(scanner, {
            opacity: 1,
            y: 0
        });

        const stageHeight = (posterStage && posterStage.offsetHeight) ? posterStage.offsetHeight : 520;

        missionTransition = gsap.timeline({
            defaults: {
                overwrite: "auto"
            },
            onComplete: () => {
                posterCurrent.src = nextMission.poster;
                posterCurrent.alt = `${nextMission.title} ${nextMission.year} poster`;

                gsap.set(posterCurrent, {
                    clipPath: "inset(0% 0 0 0)",
                    opacity: 1,
                    zIndex: 2
                });

                gsap.set(posterNext, {
                    opacity: 1,
                    zIndex: 1
                });

                gsap.set(scanner, {
                    opacity: 0,
                    y: 0
                });

                activeMissionIndex = nextIndex;
                isTransitioning = false;

                if (targetMissionIndex !== activeMissionIndex) {
                    showMission(targetMissionIndex);
                }
            }
        });

        // 1. Dim current info slightly
        missionTransition.to(
            [
                missionType,
                missionDescription,
                missionYear,
                missionLocation,
                missionHost,
                missionStatus
            ].filter(Boolean),
            {
                opacity: 0.3,
                y: -4,
                duration: 0.12,
                stagger: 0.01,
                ease: "power1.out"
            },
            0
        );

        missionTransition.to(
            missionTitle,
            {
                opacity: 0.18,
                y: -10,
                duration: 0.14,
                ease: "power2.in"
            },
            0
        );

        const isMobile = window.matchMedia("(max-width: 768px)").matches;
        const wipeDuration = isMobile ? 0.7 : 0.9;
        const wipeStart = isMobile ? 0.05 : 0.08;
        const decryptTime = isMobile ? 0.32 : 0.42;
        const titleInTime = isMobile ? 0.36 : 0.48;
        const metaInTime = isMobile ? 0.42 : 0.55;
        const titleDuration = isMobile ? 0.55 : 0.8;
        const metaDuration = isMobile ? 0.35 : 0.42;

        // 2. Scanner sweeps down
        missionTransition.to(
            scanner,
            {
                y: stageHeight,
                duration: wipeDuration,
                ease: "none"
            },
            wipeStart
        );

        // 3. Current poster wipes away from top to bottom (revealing next poster underneath)
        missionTransition.to(
            posterCurrent,
            {
                clipPath: "inset(100% 0 0 0)",
                duration: wipeDuration,
                ease: "none"
            },
            wipeStart
        );

        // 4. Midway through wipe: update data and trigger Cybertronian decrypt
        missionTransition.add(() => {
            setMissionContent(nextIndex);
            triggerMissionDecrypt(nextMission, nextIndex);
        }, decryptTime);

        // 5. Bring new text back in smoothly
        missionTransition.fromTo(
            missionTitle,
            {
                opacity: 0,
                y: 16
            },
            {
                opacity: 1,
                y: 0,
                duration: titleDuration,
                ease: "power3.out"
            },
            titleInTime
        );

        missionTransition.fromTo(
            [
                missionType,
                missionDescription,
                missionYear,
                missionLocation,
                missionHost,
                missionStatus
            ].filter(Boolean),
            {
                opacity: 0,
                y: 10
            },
            {
                opacity: 1,
                y: 0,
                duration: metaDuration,
                stagger: 0.04,
                ease: "power2.out"
            },
            metaInTime
        );
    }

    // MatchMedia: Desktop pinning vs Mobile pinned single-record viewer
    const mm = gsap.matchMedia();

    mm.add("(min-width: 769px)", () => {
        const trigger = ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: () => `+=${missions.length * 800}`,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: self => {
                const nextIndex = Math.min(
                    missions.length - 1,
                    Math.round(self.progress * (missions.length - 1))
                );
                targetMissionIndex = nextIndex;
                if (nextIndex !== activeMissionIndex && !isTransitioning) {
                    showMission(nextIndex);
                }
            }
        });

        return () => {
            if (missionTransition) {
                missionTransition.kill();
            }
            trigger.kill();
        };
    });

    mm.add("(max-width: 768px)", () => {
        const total = missions.length;

        const mobileTrigger = ScrollTrigger.create({
            trigger: ".mission-mobile-stage",
            start: "top top",
            end: () => "+=" + (window.innerHeight * (total - 1) * 0.9),
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: self => {
                const nextIndex = Math.min(
                    total - 1,
                    Math.round(self.progress * (total - 1))
                );

                targetMissionIndex = nextIndex;
                if (nextIndex !== activeMissionIndex && !isTransitioning) {
                    showMission(nextIndex);
                }
            }
        });

        return () => {
            if (missionTransition) {
                missionTransition.kill();
            }
            mobileTrigger.kill();
        };
    });

    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const handleViewportChange = () => {
        const current = missions[activeMissionIndex];
        if (current && missionDescription && !isTransitioning) {
            missionDescription.textContent = getMissionDescription(current);
        }
    };
    if (mobileQuery.addEventListener) {
        mobileQuery.addEventListener("change", handleViewportChange);
    }

    window.addEventListener(
        "robix:introComplete",
        () => {
            ScrollTrigger.refresh();
        },
        { once: true }
    );
}