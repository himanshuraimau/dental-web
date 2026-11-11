/* Ivorel Dental: the page's own script.
   The menu, phone sheet, hovers, form checks and the photo story are run by the kit (assets/system.js,
   motion.js, layout.js). This file only does two things the kit cannot know:
   1. builds every WhatsApp link from the number below;
   2. sends the booking form to the clinic's Google Sheet (see google-apps-script.gs). */

/* ---- EDIT THESE ---- */
const CONFIG = {
  clinicName: "Ivorel Dental",
  whatsapp: "919800000000", // country code + number, no "+" or spaces
  // Google Apps Script Web App URL (see google-apps-script.gs for setup)
  sheetUrl: "https://script.google.com/macros/s/AKfycbxc21tsTWuO3uZgaS14Y78rGDVuOQhx0WWfHw1Smtnc_uzDYjknol5gVSJMX6vrsuGV/exec"
};

/* ---------- 1. WhatsApp links ---------- */
const waText = encodeURIComponent(`Hi ${CONFIG.clinicName}, I'd like to book an appointment.`);
document.querySelectorAll("[data-whatsapp]").forEach((el) => {
  el.href = `https://wa.me/${CONFIG.whatsapp}?text=${waText}`;
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

/* ---------- 2. Booking form -> Google Sheet ----------
   system.js checks the fields and shows each error under its field. When every field passes, this handler
   stops the browser's own send and posts the form URL-encoded (the only body Apps Script reads into
   e.parameter). The sent line shows only after the Sheet answers. */
const form = document.getElementById("bookingForm");
if (form) {
  const status = form.querySelector("[data-form-status]");
  const button = form.querySelector("[type=submit]");
  const say = (text) => { if (status) status.textContent = text; };
  const configured = /^https:\/\/script\.google\.com\//.test(CONFIG.sheetUrl);

  const date = form.elements.date;
  if (date) date.min = new Date().toISOString().split("T")[0];

  form.addEventListener("submit", async (e) => {
    if (!form.checkValidity()) return; // system.js shows the errors
    e.preventDefault();

    // A bot filled the hidden field: drop it quietly.
    if (form.elements.website.value) { form.reset(); return; }

    if (!configured) {
      say("Not sent: the booking form is not connected yet. Please message us on WhatsApp.");
      return;
    }

    const data = new URLSearchParams(new FormData(form));
    data.delete("website");

    const wait = setTimeout(() => say("Sending"), 300);
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    try {
      const res = await fetch(CONFIG.sheetUrl, { method: "POST", body: data });
      if (!res.ok) throw new Error(String(res.status));
      clearTimeout(wait);
      form.reset();
      say(form.dataset.sent);
    } catch {
      clearTimeout(wait);
      say("Not sent: the connection failed. Your details are still here; try again or message us on WhatsApp.");
    } finally {
      button.disabled = false;
      button.removeAttribute("aria-busy");
    }
  });
}
