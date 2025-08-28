const slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(() => {
  slides[index].classList.remove("active");
  index = (index + 1) % slides.length;
  slides[index].classList.add("active");
}, 5000);

const track = document.querySelector(".testimonial-track");
const testimonials = document.querySelectorAll(".testimonial");
const dotsContainer = document.querySelector(".testimonial-dots");

let testimonialIndex = 0;
let testimonialInterval;

// Create dots dynamically
testimonials.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    showTestimonial(i);
    resetInterval();
  });
});

const dots = document.querySelectorAll(".testimonial-dots span");

function showTestimonial(index) {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((d) => d.classList.remove("active"));
  dots[index].classList.add("active");
  testimonialIndex = index;
}

function nextTestimonial() {
  testimonialIndex = (testimonialIndex + 1) % testimonials.length;
  showTestimonial(testimonialIndex);
}

function resetInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonial, 5000);
}

// Auto slide
testimonialInterval = setInterval(nextTestimonial, 5000);

const prevBtn = document.querySelector(".testimonial-arrow.left");
const nextBtn = document.querySelector(".testimonial-arrow.right");

prevBtn.addEventListener("click", () => {
  testimonialIndex =
    (testimonialIndex - 1 + testimonials.length) % testimonials.length;
  showTestimonial(testimonialIndex);
  resetInterval();
});

nextBtn.addEventListener("click", () => {
  nextTestimonial();
  resetInterval();
});

document.getElementById("applyForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let name = document.getElementById("name").value.trim();
  let phone = document.getElementById("phone").value.trim();
  let email = document.getElementById("email").value.trim();

  let valid = true;

  function isValidNigerianPhone(phone) {
    phone = phone.trim();
    // Local format (080...)
    if (phone.startsWith("0") && phone.length === 11 && !isNaN(phone)) {
      return true;
    }
    // International format (+234...)
    if (
      phone.startsWith("+234") &&
      phone.length === 14 &&
      !isNaN(phone.slice(1))
    ) {
      return true;
    }

    return false;
  }

  function isValidEmail(email) {
    email = email.trim();
    if (email.includes("@") && email.includes(".")) {
      return true;
    }

    return false;
  }

  if (name.length < 2) {
    document.getElementById("name-error").textContent =
      "Name must be at least 2 characters.";
    valid = false;
  }

  if (!isValidNigerianPhone(phone)) {
    document.getElementById("phone-error").textContent =
      "Enter a valid Nigerian phone number.";
    valid = false;
  }

  if (!isValidEmail(email)) {
    document.getElementById("email-error").textContent =
      "Enter a valid email address.";
    valid = false;
  }

  if (!valid) return;

  let loading = document.getElementById("loading");
  loading.style.display = "block";

  let message = `Hello, my name is ${name}. 
I would like to join your real estate team. 
Here are my details: 
Phone: ${phone} 
Email: ${email}`;

  let whatsappURL = `https://wa.me/2348033775381?text=${encodeURIComponent(
    message
  )}`;
  window.open(whatsappURL, "_blank");
  loading.style.display = "none";
});

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
const faders = [...fadeIN, ...fadeLeft, ...fadeRight, ...fadeOut];
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
// Note: The AOS library code has been removed as per the changes in index.html

let lastScrollY = window.scrollY;
const header = document.querySelector("header");

window.addEventListener("scroll", () => {
  if (window.scrollY > lastScrollY) {
    // scrolling down → hide header
    header.style.top = "-100px";
  } else {
    // scrolling up → show header
    header.style.top = "0";
  }
  lastScrollY = window.scrollY;
});
