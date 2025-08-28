const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".nav-overlay");
const closeBtn = document.querySelector(".close-btn");

hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("show");
  overlay.classList.toggle("show");
});

// Close menu if overlay is clicked
overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});

closeBtn.addEventListener("click", (e) => {
  e.preventDefault(); // stop it from navigating
  mobileMenu.classList.remove("show");
  overlay.classList.remove("show");
});

// Highlight active navbar link
const navLinks = document.querySelectorAll("nav a");
const currentPage = window.location.pathname.split("/").pop();

navLinks.forEach((link) => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

const fadeIN = document.querySelectorAll(".fade-in");
const fadeLeft = document.querySelectorAll(".fade-in-left");
const fadeRight = document.querySelectorAll(".fade-in-right");
const fadeOut = document.querySelectorAll(".fade-in-out");
const fade = document.querySelectorAll(".fade");
const faders = [...fadeIN, ...fadeLeft, ...fadeRight, ...fadeOut, ...fade];
const appearOptions = {
  threshold: 0.4,
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, appearOptions);

faders.forEach((fader) => {
  appearOnScroll.observe(fader);
});
