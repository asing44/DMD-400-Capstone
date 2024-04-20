import './output.css'
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import * as rive from "@rive-app/canvas";
import Lenis from "@studio-freight/lenis";

// ======================
// Section: GSAP
// ======================

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

gsap.registerEffect({
  name: 'rotateIn',
  extendTimeline: true,
  defaults: {
    duration: 1,
    rotationY: 0,
    rotationX: 0,
    transformOrigin: '50% 50%',
    ease: 'back',
    parent: '.wrap',
  }
});

/* 
Function that will animate text up in a "growth" effect
*/

function animateTextElement(elementSelector, triggerSelector, options = {}) {
  document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the element based on the selector provided
    let element = document.querySelector(elementSelector);

    if (!element) {
      console.error("Element not found: ", elementSelector);
      return;
    }

    const textContent = element.textContent.trim();
    const characters = textContent.split("");
    const textLength = characters.length;

    element.textContent = ""; // Clear the original content

    // Wrap each character in a span and append to the original element
    characters.forEach((char) => {
      const span = document.createElement("span");
      span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
      span.classList.add("inline-block"); // Ensure spans do not wrap
      element.appendChild(span);
    });

    // Default settings
    const defaults = {
      stagger: 0.05,
      delay: 0,
    };

    // Merge default settings with user-provided options
    const settings = { ...defaults, ...options };

    // Calculate dynamic duration based on the text length
    const dynamicDuration = textLength * 0.005 + 0.5; // Smaller multiplier and a base value

    // Create a GSAP timeline with ScrollTrigger
    gsap
      .timeline({
        scrollTrigger: {
          trigger: triggerSelector,
          start: "top 75%",
        },
      })
      .fromTo(
        element.querySelectorAll("span"),
        {
          yPercent: 100,
        },
        {
          delay: settings.delay,
          stagger: settings.stagger,
          yPercent: 0,
          ease: "power2.inOut",
          duration: dynamicDuration,
        }
      );
  });
}


// ======================
// Section: Initialization
// ======================

gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis();

lenis.on("scroll", (e) => {
  // console.log(e);
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

// const b = new rive.Rive({
//   src: "./rive/nav-button.riv",
//   canvas: document.getElementById("navButton"),
//   autoplay: true,
//   stateMachines: "SM__nav-button",
//   onLoad: () => {
//     b.resizeDrawingSurfaceToCanvas();
//   },
// });

// Resize window for animations
// window.addEventListener(
//   "resize",
//   () => {
//     b.resizeDrawingSurfaceToCanvas();
//   },
//   false
// );

/* 
Detects whenever screen is moving up or down
*/
function screenMoving() {
  let scroll = 0;

  ScrollTrigger.create({
    trigger: "#body",
    start: "top top", // Trigger at the top of the viewport
    end: "bottom bottom", // Trigger at the bottom of the viewport
    onUpdate: (self) => {
      let scrollDirection = self.direction; // 1 for down, -1 for up
      let currentScrollTop = self.scroll(); // Current scroll position

      if (scrollDirection === 1) {
        
      } else if (scrollDirection === -1) {
        console.log("Scrolling Up");
      }
      // Update last scroll position
      scroll = currentScrollTop;
    },
  });

  return scroll
}

// ======================
// Section: Navigation
// ======================

// Navigation pinning
let nav = document.getElementsByClassName("nav")[0];

let retractNav_anim = gsap
  .timeline({
    paused: true,
  })
  .to(nav, {
    yPercent: -100,
    ease: "power2.inOut",
    yoyo: true,
});

gsap.to(nav, {
  scrollTrigger: {
    trigger: ".main",
    start: "top top",
    pin: ".nav",
    pinSpacing: false,
    onUpdate: (self) => {
      let scrollDirection = self.direction; // 1 for down, -1 for up
      let currentScrollTop = self.scroll(); // Current scroll position
      if (scrollDirection === -1 && currentScrollTop >= nav.clientHeight) {
        retractNav_anim.play();
      } else if (scrollDirection === 1) {
        retractNav_anim.reverse();
      } else if (currentScrollTop <= (1.2 * nav.clientHeight)) {
        retractNav_anim.reverse();
      }

      scroll = currentScrollTop;
    },
  }
})

// ======================
// Section: Hero
// ======================

window.seeMore = function () {
  gsap.to(window, {
    duration: 1.25,
    scrollTo: {
      y: ".features",
    },
    ease: "power2.inOut"
  });
};

// ======================
// Section: Features
// ======================

animateTextElement(".features__h2", ".features");

animateTextElement(".features__tag", ".features", {
  delay: 0.25
});