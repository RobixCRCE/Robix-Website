import gsap from "gsap";


export function initPreloader() {

  const preloader =
    document.querySelector("#preloader");


  const status =
    document.querySelector("#status");


  const slices =
    gsap.utils.toArray(".logo-slice");


  if (!preloader) {
    return;
  }



  /* =========================================
     INITIAL GRID STATES
     ========================================= */


  gsap.set(".v", {

    scaleY: 0,

    transformOrigin:
      "50% 0%"

  });


  gsap.set(".h", {

    scaleX: 0,

    transformOrigin:
      "0% 50%"

  });



  /* =========================================
     INITIAL LOGO STATES
     ========================================= */


  slices.forEach((slice, index) => {

    gsap.set(slice, {

      x:
        index % 2 === 0
          ? -170
          : 170,

      y:
        (index - 2.5) * 8,

      rotation:
        index % 2 === 0
          ? -4
          : 4,

      scale:
        0.94,

      opacity:
        0,

      filter:
        "brightness(.45)"

    });

  });



  /* =========================================
     MECHANICAL SYSTEM STATES
     ========================================= */


  gsap.set(
    ".mech-panel",
    {
      opacity: 0
    }
  );


  gsap.set(
    ".core-ring",
    {
      opacity: 0,
      scale: 0.7
    }
  );


  gsap.set(
    ".diag",
    {
      opacity: 0
    }
  );



  /* =========================================
     MASTER TIMELINE
     ========================================= */


  const tl =
    gsap.timeline({

      defaults: {

        ease:
          "power3.out"

      }

    });



  /* =========================================
     01 — SYSTEM INITIALIZATION
     ========================================= */


  tl.to(

    "#status",

    {

      opacity: 1,

      duration: 0.35

    }

  );



  /* =========================================
     02 — MECHANICAL CHASSIS ENTERS
     ========================================= */


  tl.to(

    ".mech-panel",

    {

      opacity: 0.72,

      x: 0,

      y: 0,

      rotation: 0,

      duration: 0.65,

      stagger: 0.06,

      ease:
        "power4.out"

    },

    "+=.05"

  );



  /* =========================================
     03 — DIAGONAL STRUCTURE
     ========================================= */


  tl.to(

    ".diag",

    {

      opacity: 0.55,

      scaleX: 1,

      duration: 0.45,

      stagger: 0.05,

      ease:
        "power2.inOut"

    },

    "-=.35"

  );



  /* =========================================
     04 — CENTRAL CORE
     ========================================= */


  tl.to(

    ".core-ring",

    {

      opacity: 0.5,

      scale: 1,

      duration: 0.5,

      ease:
        "back.out(1.6)"

    },

    "-=.25"

  );



  tl.to(

    ".core-ticks",

    {

      rotation: 80,

      duration: 1.4,

      ease: "none"

    },

    "<"

  );



  /* =========================================
     05 — VERTICAL GRID
     ========================================= */


  tl.to(

    ".v",

    {

      scaleY: 1,

      duration: 0.8,

      stagger: 0.055,

      ease:
        "power2.inOut"

    },

    "+=.15"

  );



  /* =========================================
     06 — HORIZONTAL GRID
     ========================================= */


  tl.to(

    ".h",

    {

      scaleX: 1,

      duration: 0.75,

      stagger: 0.11,

      ease:
        "power3.inOut"

    },

    "-=.25"

  );



  /* =========================================
     07 — GRID INTERSECTION FLASHES
     ========================================= */


  tl.to(

    ".cross",

    {

      opacity: 1,

      scale: 2.6,

      duration: 0.12,

      stagger: 0.08

    },

    "-=.15"

  );


  tl.to(

    ".cross",

    {

      opacity: 0,

      scale: 1,

      duration: 0.18,

      stagger: 0.04

    }

  );



  /* =========================================
     08 — DETECT LOGO
     ========================================= */


  tl.to(

    ".logo-ghost",

    {

      opacity: 0.22,

      duration: 0.25

    },

    "-=.05"

  );



  /* =========================================
     09 — ASSEMBLE LOGO
     ========================================= */


  tl.to(

    slices,

    {

      x: 0,

      y: 0,

      rotation: 0,

      scale: 1,

      opacity: 1,

      filter:
        "brightness(1)",

      duration: 0.58,

      stagger: 0.07,

      ease:
        "back.out(1.9)"

    }

  );



  /* =========================================
     10 — MECHANICAL LOCK
     ========================================= */


  tl.to(

    "#logoStage",

    {

      keyframes: [

        {

          scale: 1.035,

          duration: 0.08,

          ease:
            "power2.out"

        },

        {

          scale: 1,

          duration: 0.12,

          ease:
            "power2.in"

        }

      ]

    }

  );



  /* Impact flash */


  tl.to(

    ".lock-flash",

    {

      opacity: 0.22,

      duration: 0.06

    },

    "<"

  );


  tl.to(

    ".lock-flash",

    {

      opacity: 0,

      duration: 0.14

    }

  );



  /* =========================================
     11 — CLEAN FINAL LOGO
     ========================================= */


  tl.to(

    ".logo-final",

    {

      opacity: 1,

      duration: 0.22

    }

  );


  tl.to(

    [
      ".logo-slice",
      ".logo-ghost"
    ],

    {

      opacity: 0,

      duration: 0.18

    },

    "<"

  );



  /* =========================================
     12 — ENERGY ACTIVATION
     ========================================= */


  tl.to(

    ".energy",

    {

      opacity: 1,

      scaleX: 1,

      duration: 0.45,

      ease:
        "power2.inOut"

    }

  );



  tl.to(

    ".core-ring",

    {

      boxShadow:
        "0 0 55px rgba(255,43,43,.24)",

      borderColor:
        "rgba(255,43,43,.45)",

      duration: 0.3

    },

    "<"

  );



  tl.to(

    ".energy",

    {

      opacity: 0,

      duration: 0.22

    }

  );



  /* =========================================
     13 — LOGO POWER GLOW
     ========================================= */


  tl.to(

    ".logo-final",

    {

      filter:
        "drop-shadow(0 0 16px rgba(255,43,43,.55))",

      duration: 0.28

    },

    "-=.18"

  );



  /* =========================================
     14 — CORE ONLINE
     ========================================= */


  tl.call(() => {

    status.textContent =
      "ROBIX CORE // ONLINE";

  });



  tl.to(

    "#status",

    {

      color:
        "#ff2b2b",

      duration:
        0.2

    }

  );



  /* Hold completed machine */

  tl.to(

    {},

    {

      duration:
        0.55

    }

  );



  /* =========================================
     15 — TRANSFORMATION / EXIT
     ========================================= */



  /* Vertical grid collapses */


  tl.to(

    ".v",

    {

      scaleY: 0,

      transformOrigin:
        "50% 50%",

      duration: 0.6,

      stagger: 0.025

    },

    "exit"

  );



  /* Mechanical panels explode outward */


  tl.to(

    ".mp1",

    {

      x: -180,

      y: -90,

      rotation: -16,

      opacity: 0,

      duration: 0.65,

      ease:
        "power3.in"

    },

    "exit"

  );


  tl.to(

    ".mp2",

    {

      x: 180,

      y: -90,

      rotation: 16,

      opacity: 0,

      duration: 0.65,

      ease:
        "power3.in"

    },

    "exit"

  );


  tl.to(

    ".mp3",

    {

      x: -180,

      y: 90,

      rotation: 16,

      opacity: 0,

      duration: 0.65,

      ease:
        "power3.in"

    },

    "exit"

  );


  tl.to(

    ".mp4",

    {

      x: 180,

      y: 90,

      rotation: -16,

      opacity: 0,

      duration: 0.65,

      ease:
        "power3.in"

    },

    "exit"

  );



  /* Core expands outward */


  tl.to(

    ".core-ring",

    {

      scale: 1.35,

      opacity: 0,

      duration: 0.6,

      ease:
        "power3.in"

    },

    "exit"

  );



  tl.to(

    ".diag",

    {

      opacity: 0,

      duration: 0.3

    },

    "exit"

  );



  /* Horizontal grid collapses */


  tl.to(

    ".h",

    {

      scaleX: 0,

      transformOrigin:
        "50% 50%",

      duration: 0.6,

      stagger: 0.04

    },

    "exit"

  );



  /* =========================================
     16 — LOGO RUSHES INTO CAMERA
     ========================================= */


  tl.to(

    "#logoStage",

    {

      scale: 1.9,

      opacity: 0,

      duration: 0.75,

      ease:
        "power4.in"

    },

    "exit+=.15"

  );

  tl.to(

    "#logoStage",

    {

      scale: 1.9,

      opacity: 0,

      duration: 0.75,

      ease:
        "power4.in"

    },

    "exit+=.15"

  );

  tl.to(

    "#status",

    {

      opacity: 0,

      duration: 0.25

    },

    "exit+=.25"

  );



  /* =========================================
     17 — REVEAL HERO
     ========================================= */


  tl.to(

    preloader,

    {

      opacity: 0,

      duration: 0.25,

      onComplete: () => {

        preloader.style.display =
          "none";

        document.body.classList.remove(
          "loading"
        );

      }

    }

  );

}