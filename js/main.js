/* =========================================================
   Dental Clinic Landing Page — main.js
   ========================================================= */

/* ---- EDIT THESE: used for every WhatsApp / Call link on the page ---- */
const CONFIG = {
  clinicName: "[[CLINIC_NAME]]",
  whatsapp: "919800000000", // country code + number, no "+" or spaces
  phone: "+91 98000 00000"  // shown as text and used for tel: links
};

document.documentElement.classList.remove("no-js");

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- 1. WhatsApp & Call link builder ---------- */
function whatsappUrl(service) {
  const msg = service
    ? `Hi ${CONFIG.clinicName}, I'd like to book an appointment for ${service}.`
    : `Hi ${CONFIG.clinicName}, I'd like to book an appointment.`;
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg)}`;
}

document.querySelectorAll("[data-whatsapp]").forEach((el) => {
  el.href = whatsappUrl(el.dataset.service);
});

const telHref = "tel:" + CONFIG.phone.replace(/[^\d+]/g, "");
document.querySelectorAll("[data-call]").forEach((el) => {
  el.href = telHref;
  if (el.hasAttribute("data-phone-text")) el.textContent = CONFIG.phone;
});

/* ---------- 2. Mobile menu toggle ---------- */
const header = document.getElementById("header");
const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

function setMenu(open) {
  nav.classList.toggle("open", open);
  header.classList.toggle("menu-open", open);
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
}

navToggle.addEventListener("click", () => setMenu(!nav.classList.contains("open")));

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

/* ---------- 3. Sticky header style ---------- */
function onScroll() {
  header.classList.toggle("scrolled", window.scrollY > 50);
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- 4. Active nav link ---------- */
const navLinks = document.querySelectorAll(".nav__link");
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) =>
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

/* ---------- 5. Reveal on scroll ---------- */
const revealObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll(".reveal").forEach((el, i) => {
  // small stagger for items in the same grid
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  revealObserver.observe(el);
});

/* ---------- 6. Counter animation ---------- */
function animateCount(el) {
  const target = Number(el.dataset.count);
  if (reduceMotion) {
    el.textContent = target.toLocaleString("en-IN");
    return;
  }
  const duration = 1600;
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased).toLocaleString("en-IN");
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      obs.unobserve(entry.target);
    });
  },
  { threshold: 0.6 }
);
document.querySelectorAll("[data-count]").forEach((el) => counterObserver.observe(el));

/* ---------- 7. Footer year ---------- */
document.getElementById("year").textContent = new Date().getFullYear();
