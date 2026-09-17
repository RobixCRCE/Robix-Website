import gsap from "gsap";

import {
  ScrollTrigger
} from "gsap/ScrollTrigger";


gsap.registerPlugin(
  ScrollTrigger
);


export function initTeam() {

  const buttons =
    gsap.utils.toArray(
      ".dept-button"
    );


  const panels =
    gsap.utils.toArray(
      ".department-panel"
    );


  if (
    buttons.length === 0 ||
    panels.length === 0
  ) {
    return;
  }



  /* =========================================
     DEPARTMENT SWITCHER
     ========================================= */

  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const department =
            button.dataset.dept;


          const nextPanel =
            document.querySelector(
              `[data-panel="${department}"]`
            );


          const currentPanel =
            document.querySelector(
              ".department-panel.active"
            );


          if (
            !nextPanel ||
            nextPanel === currentPanel
          ) {
            return;
          }



          buttons.forEach(
            item => {

              item.classList.remove(
                "active"
              );

            }
          );


          button.classList.add(
            "active"
          );



          const tl =
            gsap.timeline();



          /*
           * Current department retracts.
           */

          if (currentPanel) {

            tl.to(
              currentPanel,
              {
                opacity: 0,

                x: -40,

                duration: 0.22,

                ease:
                  "power2.in",

                onComplete: () => {

                  currentPanel.classList.remove(
                    "active"
                  );

                }
              }
            );

          }



          /*
           * New department deploys.
           */

          tl.call(
            () => {

              nextPanel.classList.add(
                "active"
              );


              gsap.set(
                nextPanel,
                {
                  opacity: 0,
                  x: 50
                }
              );

            }
          );


          tl.to(
            nextPanel,
            {
              opacity: 1,

              x: 0,

              duration: 0.42,

              ease:
                "power3.out"
            }
          );


          /*
           * Leaders deploy first.
           */

          tl.fromTo(
            nextPanel.querySelectorAll(
              ".leader-card"
            ),
            {
              opacity: 0,
              y: 25
            },
            {
              opacity: 1,
              y: 0,

              duration: 0.35,

              stagger: 0.08,

              ease:
                "power3.out"
            },
            "-=.25"
          );


          /*
           * Members deploy after leaders.
           *
           * Technical has no member cards,
           * so this safely does nothing there.
           */

          const members =
            nextPanel.querySelectorAll(
              ".member-card"
            );


          if (members.length > 0) {

            tl.fromTo(
              members,
              {
                opacity: 0,
                y: 20
              },
              {
                opacity: 1,
                y: 0,

                duration: 0.3,

                stagger: 0.04,

                ease:
                  "power3.out"
              },
              "-=.2"
            );

          }


          tl.call(
            () => {

              ScrollTrigger.refresh();

            }
          );

        }
      );

    }
  );



  /* =========================================
     FOUNDER / ADVISOR ENTRANCE
     ========================================= */

  gsap.from(
    ".command-person",
    {

      scrollTrigger: {

        trigger:
          "#command",

        start:
          "top 65%",

        once:
          true

      },

      opacity: 0,

      y: 50,

      duration: 0.7,

      stagger: 0.1,

      ease:
        "power3.out"

    }
  );



  /* =========================================
     TEAM ENTRANCE
     ========================================= */

  gsap.from(
    ".department-selector",
    {

      scrollTrigger: {

        trigger:
          "#team",

        start:
          "top 70%",

        once:
          true

      },

      opacity: 0,

      y: 35,

      duration: 0.6,

      ease:
        "power3.out"

    }
  );

}