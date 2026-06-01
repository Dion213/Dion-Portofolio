const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".site-nav");
const navLinks = document.querySelectorAll(".site-nav a");
const reveals = document.querySelectorAll(".reveal");
const introScreen = document.querySelector(".intro-screen");

if (introScreen) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const introDuration = reduceMotion ? 350 : 1800;

  window.setTimeout(() => {
    introScreen.classList.add("is-hidden");
    document.body.classList.remove("intro-playing");
  }, introDuration);

  introScreen.addEventListener("transitionend", () => {
    introScreen.remove();
  });
}

if (menuButton && nav) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    nav.classList.toggle("is-open", !isOpen);
    document.body.classList.toggle("menu-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    });
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.16,
    }
  );

  reveals.forEach((item) => observer.observe(item));
} else {
  reveals.forEach((item) => item.classList.add("is-visible"));
}
