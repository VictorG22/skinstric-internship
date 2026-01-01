import { gsap } from "gsap";

export function initHomeHoverAnimations() {
  const title = document.getElementById("home__title");
  const lines = title?.querySelectorAll("span");
  const left = document.getElementById("home__left--btn");
  const leftContainer = document.getElementById("left__container");
  const right = document.getElementById("home__right--btn");
  const rightContainer = document.getElementById("right__container");

  if (!title || !left || !right || !lines) return;

  const leftTL = gsap.timeline({ paused: true });
  const rightTL = gsap.timeline({ paused: true });

  const createLeftAnimation = () => {
    const moveRight = window.innerWidth * 0.2;

    leftTL.clear(); // this remove old tweens from previous resizes
    leftTL
      .to(title, { x: moveRight, duration: 0.75, ease: "power3.inOut" }, 0)
      .to(rightContainer, { autoAlpha: 0, duration: 0.75, ease: "power3.out" }, 0)
      .to(lines, { x: 100, duration: 1, ease: "power3.out", stagger: 0.05 }, 0);
  };

  const createRightAnimation = () => {
    const moveLeft = -window.innerWidth * 0.2;

    rightTL.clear(); // this remove old tweens from previous resizes
    rightTL
      .to(title, { x: moveLeft, duration: 0.75, ease: "power3.inOut" }, 0)
      .to(leftContainer, { autoAlpha: 0, duration: 0.75, ease: "power3.out" }, 0)
      .to(lines, { x: -100, duration: 1, ease: "power3.out", stagger: 0.05 }, 0);
  };

  // Hover left
  left.addEventListener("mouseenter", () => {
    createLeftAnimation();
    leftTL.play();
  });
  left.addEventListener("mouseleave", () => leftTL.reverse());

  // Hover right
  right.addEventListener("mouseenter", () => {
    createRightAnimation();
    rightTL.play();
  });
  right.addEventListener("mouseleave", () => rightTL.reverse());

  return () => {
    leftTL.kill();
    rightTL.kill();
  };
}
