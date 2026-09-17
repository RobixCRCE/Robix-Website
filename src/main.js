import "./styles/global.css";
import "./styles/preloader.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/operations.css";
import "./styles/machines.css";
import "./styles/missions.css";
import "./styles/team.css";
import "./styles/contact.css";


import {
  initPreloader
} from "./animations/preloader.js";


import {
  initHero
} from "./animations/hero.js";


import {
  initAboutTransition
} from "./animations/about.js";

import {
  initOperations
} from "./animations/operations.js";

import {
  initMachines
} from "./animations/machines.js";

import {
  initMissions
} from "./animations/missions.js";

import {
  initTeam
} from "./animations/team.js";

import {
  initContact
} from "./animations/contact.js";

document.addEventListener(
  "DOMContentLoaded",
  () => {

    initHero();

    initAboutTransition();

    initOperations();

    initMachines();

    initMissions();

    initTeam();

    initContact();

    initPreloader();

  }
);