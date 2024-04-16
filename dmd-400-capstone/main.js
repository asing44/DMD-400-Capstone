import './output.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as rive from "@rive-app/canvas";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

// ======================
// Section: Initialization
// ======================

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  console.log(e);
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

/**
 * Animation for the navigaiton button
 *
 */

const b = new rive.Rive({
  src: "./rive/nav-button.riv",
  canvas: document.getElementById("navButton"),
  autoplay: true,
  stateMachines: "SM__nav-button",
  onLoad: () => {
    b.resizeDrawingSurfaceToCanvas();
  },
});


// Resize window for animations
window.addEventListener(
  "resize",
  () => {
    b.resizeDrawingSurfaceToCanvas();
  },
  false
);

setupCounter(document.querySelector('#counter'))
