import "./styles/global.css";
import "./styles/preloader.css";
import "./styles/hero.css";

import {
  initPreloader
} from "./animations/preloader.js";


document.addEventListener(
  "DOMContentLoaded",
  () => {

    initPreloader();

  }
);