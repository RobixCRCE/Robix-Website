import gsap from "gsap";


export function initHero() {

  const hero =
    document.querySelector("#hero");


  if (!hero) {
    return;
  }



  /* =========================================
     INITIAL STATES
     ========================================= */


  gsap.set(
    ".hero-kicker",
    {
      opacity: 0,
      y: 16
    }
  );


  gsap.set(
    ".hero-line",
    {
      opacity: 0,
      y: 80
    }
  );


  gsap.set(
    ".hero-description",
    {
      opacity: 0,
      y: 25
    }
  );


  gsap.set(
    ".hero-meta",
    {
      opacity: 0,
      y: 20
    }
  );


  gsap.set(
    ".hero-scroll",
    {
      opacity: 0
    }
  );


  gsap.set(
    ".hero-machine",
    {
      opacity: 0,
      scale: 0.78,
      rotation: 8
    }
  );



  /* =========================================
     PLAY HERO WHEN INTRO HANDS OVER
     ========================================= */


  window.addEventListener(

    "robix:introComplete",

    () => {

      playHero();

    }

  );



  function playHero() {

    const tl =
      gsap.timeline({

        defaults: {

          ease:
            "power4.out"

        }

      });



    tl.to(

      ".hero-machine",

      {

        opacity: 1,

        scale: 1,

        rotation: 0,

        duration:
          1.05

      }

    );



    tl.to(

      ".hero-kicker",

      {

        opacity: 1,

        y: 0,

        duration:
          0.35

      },

      "-=.75"

    );



    tl.to(

      ".hero-line",

      {

        opacity: 1,

        y: 0,

        duration:
          0.7,

        stagger:
          0.09

      },

      "-=.62"

    );



    tl.to(

      ".hero-description",

      {

        opacity: 1,

        y: 0,

        duration:
          0.45

      },

      "-=.32"

    );



    tl.to(

      ".hero-meta",

      {

        opacity: 1,

        y: 0,

        duration:
          0.4

      },

      "-=.25"

    );



    tl.to(

      ".hero-scroll",

      {

        opacity: 1,

        duration:
          0.35

      },

      "-=.15"

    );



    /*
    Start continuous subtle movement.
    */

    startAmbientMotion();

  }



  function startAmbientMotion() {

    /*
    Outer ring rotates slowly.
    */

    gsap.to(

      ".ring-outer",

      {

        rotation: 360,

        duration: 55,

        repeat: -1,

        ease: "none",

        transformOrigin:
          "50% 50%"

      }

    );



    /*
    Middle ring moves opposite direction.
    */

    gsap.to(

      ".ring-middle",

      {

        rotation: -360,

        duration: 38,

        repeat: -1,

        ease: "none",

        transformOrigin:
          "50% 50%"

      }

    );



    /*
    Core glow breathes VERY subtly.
    */

    gsap.to(

      ".machine-core-glow",

      {

        scale: 1.12,

        opacity: 0.72,

        duration: 1.8,

        repeat: -1,

        yoyo: true,

        ease:
          "sine.inOut"

      }

    );



    /*
    Mechanical panels barely move.
    */

    gsap.to(

      ".machine-panel-left",

      {

        x: -5,

        duration: 3.2,

        repeat: -1,

        yoyo: true,

        ease:
          "sine.inOut"

      }

    );


    gsap.to(

      ".machine-panel-right",

      {

        x: 5,

        duration: 3.2,

        repeat: -1,

        yoyo: true,

        ease:
          "sine.inOut"

      }

    );

  }

}