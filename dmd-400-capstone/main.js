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
// Section: Button 2 Animations
// ======================

// Button 2 hover animation
let button2Anims = gsap.utils.toArray(".anim__button-2");

button2Anims.forEach(animationContainer => {
  const container = gsap.utils.selector(animationContainer);

  let tl = gsap
    .timeline({
      duration: 1,
      paused: true
    })
    .to(container(".button-2__hover"), {
      yPercent: -100,
    }, ("<"))
    .to(
    container(".button-2__text"),
      {
        color: "#FBFBFC",
      },
      "<"
    )
    .to(container(".button-2__arrow svg"), {
      stroke: "#FBFBFC",
    }, "<")
    .to(animationContainer, {
      paddingRight: "32px",
      ease: "ease.inOut"
    }, "<50%")

  animationContainer.addEventListener("mouseenter", () => {
    tl.play();
  });

  animationContainer.addEventListener("mouseleave", () => {
    tl.reverse();
  })
});

// ======================
// Section: Slide Up onEnter Animations
// ======================

// Up
let slideUpAnims = gsap.utils.toArray(".anim__slide--up");


slideUpAnims.forEach((el) => {
  gsap.fromTo(
    el,
    {
      yPercent: 15,
      opacity: 0,
    },
    {
      duration: 1,
      yPercent: 0,
      opacity: 1,
      ease: "power2.inOut",
      scrollTrigger: {
        trigger: el,
        start: "top 75%",
      },
    }
  );
});

// ======================
// Section: Move Delay Animations
// ======================

gsap.utils.toArray(".anim__move-delay").forEach((animation) => {
  // Define a base movement distance (e.g., 50 pixels)
  const baseMovement = 10;

  const elementHeight = animation.offsetHeight >= 50 ? animation.offsetHeight : 50;

  ScrollTrigger.create({
    trigger: animation,
    start: "top 50%", // Start when the top of the element hits the middle of the viewport
    end: "bottom top", // End when the bottom of the element exits the top of the viewport
    scrub: true, // Smooth scrubbing effect to sync animation with scroll
    markers: true,
    onUpdate: (self) => {
      // Get the height of the element

      // Calculate a scaling factor based on the element height
      // Smaller elements get a larger factor to increase their movement distance
      const scale = Math.max(0.2, 100 / elementHeight); // Ensuring a minimum scale of 0.5

      // Calculate the 'y' translation as scaled by the element's height
      const yPercent =
        self.direction === 1 ? -baseMovement * scale : baseMovement * scale;

      // Apply the animation to move the element
      gsap.to(animation, {
        duration: 2,
        yPercent: yPercent,
        ease: "ease.inOut",
        overwrite: "auto",
      });
    },
  });
});

// ======================
// Section: Wrtie-on Animations
// ======================

gsap.utils.toArray(".anim__write-on").forEach(animation => {


  if (!animation) {
    console.error("Element not found: ", animation);
    return;
  } else {
    console.log("Animtion found!: ", animation)
  }

  const characters = animation.textContent.trim().split("");
  const textLength = characters.length;

  animation.textContent = ""; // Clear the original content

  // Wrap each character in a span and append to the original element
  characters.forEach((char) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char; // Preserve spaces
    span.classList.add("inline-block"); // Ensure spans do not wrap
    animation.appendChild(span);
  });

  // Calculate dynamic duration based on the text length
  const dynamicDuration = textLength * 0.1 + 1; // Smaller multiplier and a base value

  // Create a GSAP timeline with ScrollTrigger
  gsap
    .timeline({
      scrollTrigger: {
        trigger: animation,
        start: "-25% 55%",
        end: "150% 75%",
        scrub: true
      },
    })
    .fromTo(
      animation.querySelectorAll("span"),
      {
        color: "#98a2b3",
      },
      {
        delay: 0.2,
        stagger: 0.1,
        ease: "power2.inOut",
        duration: dynamicDuration,
        color: "#eaecf0",
      }
    );
});


// ======================
// Section: Ripple Text Animations
// ======================

/* 
Function that will animate text up in a "growth" effect.

THe function is also manually called. There is an auto below that uses class names.
*/

function rippleText_anim(elementSelector, triggerSelector, options = {}) {
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

function rippleText_anim__auto(element, triggerSelector, options = {}) {
  document.addEventListener("DOMContentLoaded", function () {
    // Retrieve the element based on the selector provided

    if (!element) {
      console.error("Element not found: ", element);
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

let rippleTextAnimContainer = gsap.utils.toArray(".anim__ripple-text-container");

rippleTextAnimContainer.forEach(container => {
  const animContainer = gsap.utils.selector(container);
  const el = animContainer(".anim__ripple-text")[0]
console.log(el);

rippleText_anim__auto(el, container)
});

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
});

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
// Section: Statement
// ======================

// Copy text write on

// ======================
// Section: Features
// ======================

// Header text
rippleText_anim(".features__h2", ".features");

rippleText_anim(".features__tag", ".features", {
  delay: 0.25,
});

// Animate progress bar
const featureCardHeight = document.getElementsByClassName("features--card")[0].offsetHeight;

let progress_tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".features__progress-wrapper",
    pin: ".features__progress-container",
    start: "top 25%",
    end: `bottom 74%`,
    scrub: 1,
    anticipatePin: 0.1,
  },
});

gsap.utils.toArray(".features__progress-circle").forEach((circle, index) => {
  index == 0
    ? progress_tl.add(gsap.to(circle, { scale: 3 }))
    : progress_tl.add(gsap.to(circle, { scale: 3 }));
});