const loading = document.getElementById("loading");
function showPopup(message, type = "success") {
  const popup = document.getElementById("popup");
  const popupMessage = document.getElementById("popup-message");
  const popupIcon = document.getElementById("popup-icon");

  // Reset previous classes
  popupIcon.className = "";

  // Update text
  popupMessage.textContent = message;

  // Set icon based on type
  if (type === "success") {
    popupIcon.classList.add("success", "fas", "fa-check-circle");
  } else {
    popupIcon.classList.add("error", "fas", "fa-times-circle");
  }

  // Show popup
  popup.style.display = "flex";
  popup.style.alignItems = "center";
  popup.style.justifyContent = "center";

  // Auto close after 3s
  setTimeout(() => {
    popup.style.display = "none";
  }, 3000);
}

// Close popup on click
document.getElementById("popup-close").onclick = function () {
  document.getElementById("popup").style.display = "none";
};

// Close popup if user clicks outside box
window.onclick = function (event) {
  const popup = document.getElementById("popup");
  if (event.target === popup) {
    popup.style.display = "none";
  }
};
document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const form = event.target;
      document
        .querySelectorAll(".error")
        .forEach((el) => (el.textContent = ""));

      const name = form.querySelector('input[name="name"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const phone = form.querySelector('input[name="phone"]').value.trim();
      const message = form
        .querySelector('textarea[name="message"]')
        .value.trim();

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

      // Show loading spinner
      loading.style.display = "block";
      const formData = new FormData(form);

      fetch("https://formsubmit.co/samanthaoloruntoba6@gmail.com", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      })
        .then((response) => {
          if (response.ok) {
            loading.style.display = "none";
            showPopup("Message sent successfully!", "success");

            form.reset();
            setTimeout(() => {
              document.getElementById("popup").style.display = "none";
            }, 3000);
          } else {
            loading.style.display = "none";
            showPopup("Failed to send. Try again.", "error");
          }
        })
        .catch((error) => {
          loading.style.display = "none";
          showPopup("⚠️ Error: " + error.message);
        });
    });
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
