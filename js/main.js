(function () {
  "use strict";

  const roles = [
    "Mobile App Developer",
    "Android · Kotlin Expert",
    "Flutter · BLoC Architect",
    "MVVM & Clean Code",
  ];
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typedEl = document.getElementById("typedRole");
  const typeSpeed = 80;
  const deleteSpeed = 45;
  const pauseEnd = 2000;

  function typeRole() {
    if (!typedEl) return;
    const current = roles[roleIndex];

    if (isDeleting) {
      typedEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === current.length) {
      delay = pauseEnd;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(typeRole, delay);
  }

  typeRole();

  const header = document.getElementById("header");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 40);
    }
  });

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const revealEls = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => revealObserver.observe(el));

  const glow = document.querySelector(".cursor-glow");
  if (glow && window.matchMedia("(hover: hover)").matches) {
    document.addEventListener("mousemove", (e) => {
      glow.style.left = e.clientX + "px";
      glow.style.top = e.clientY + "px";
    });
  }

  const profileImg = document.getElementById("profileImg");
  if (profileImg && window.matchMedia("(hover: hover)").matches) {
    profileImg.addEventListener("mousemove", (e) => {
      const rect = profileImg.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / 20;
      const y = (e.clientY - rect.top - rect.height / 2) / 20;
      profileImg.style.transform = `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    profileImg.addEventListener("mouseleave", () => {
      profileImg.style.transform = "";
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (e) => {
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
})();
