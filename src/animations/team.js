import gsap from "gsap";

import {
  ScrollTrigger
} from "gsap/ScrollTrigger";

import {
  teamMembers,
  getDepartmentLabel
} from "../data/team.js";


gsap.registerPlugin(
  ScrollTrigger
);


const LINKEDIN_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" /></svg>';

const GITHUB_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" /></svg>';

const EMAIL_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>';


function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}


function socialLinks(person) {
  const links = [];

  if (person.linkedin) {
    links.push(
      `<a href="${escapeHtml(person.linkedin)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(person.name)} on LinkedIn" title="LinkedIn" class="social-link linkedin-link">${LINKEDIN_ICON}</a>`
    );
  }

  if (person.github) {
    links.push(
      `<a href="${escapeHtml(person.github)}" target="_blank" rel="noopener noreferrer" aria-label="${escapeHtml(person.name)} on GitHub" title="GitHub" class="social-link github-link">${GITHUB_ICON}</a>`
    );
  }

  if (person.email) {
    links.push(
      `<a href="mailto:${escapeHtml(person.email)}" aria-label="Email ${escapeHtml(person.name)}" title="Email" class="social-link email-link">${EMAIL_ICON}</a>`
    );
  }

  if (links.length === 0) {
    return "";
  }

  return `<div class="member-socials">${links.join("")}</div>`;
}


function leaderCard(person, isLead) {
  const dept = getDepartmentLabel(person.department);

  return `
    <article class="leader-card${isLead ? " lead-card" : ""}">
      <div class="leader-image">
        <img src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}" loading="lazy">
      </div>
      <div class="leader-meta">
        <span class="leader-dept">${escapeHtml(dept)}</span>
        <span>${escapeHtml(person.roleTitle)}</span>
        <h4>${escapeHtml(person.name)}</h4>
        ${socialLinks(person)}
      </div>
    </article>`;
}


function memberCard(person) {
  const dept = getDepartmentLabel(person.department);

  return `
    <article class="member-card">
      <div class="member-photo">
        <img src="${escapeHtml(person.image)}" alt="${escapeHtml(person.name)}" loading="lazy">
      </div>
      <span class="member-dept">${escapeHtml(dept)}</span>
      <h5>${escapeHtml(person.name)}</h5>
      <span class="member-role">${escapeHtml(person.roleTitle)}</span>
      ${socialLinks(person)}
    </article>`;
}


function renderCrew() {
  const leadership = teamMembers.filter(
    person =>
      person.role === "lead" ||
      person.role === "co-lead"
  );

  const members = teamMembers.filter(
    person => person.role === "member"
  );

  const leadGrid = document.querySelector("[data-lead-grid]");
  const memberGrid = document.querySelector("[data-member-grid]");

  if (leadGrid) {
    leadGrid.innerHTML = leadership
      .map(person => leaderCard(person, person.role === "lead"))
      .join("");
  }

  if (memberGrid) {
    memberGrid.innerHTML = members
      .map(memberCard)
      .join("");
  }
}


export function initTeam() {

  renderCrew();

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
     CREW SWITCHER — LEADS / MEMBERS
     ========================================= */

  buttons.forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const tab =
            button.dataset.tab ||
            button.dataset.dept;


          const nextPanel =
            document.querySelector(
              `[data-panel="${tab}"]`
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
           * Current crew retracts.
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
           * New crew deploys.
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
           * The leads panel has no member cards,
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
