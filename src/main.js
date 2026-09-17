import "./styles/global.css";
import "./styles/preloader.css";
import "./styles/hero.css";


import {
  initPreloader
} from "./animations/preloader.js";


import {
  initHero
} from "./animations/hero.js";



document.addEventListener(

  "DOMContentLoaded",

  () => {

    initHero();

    initPreloader();

  }

);