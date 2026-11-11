# dental-web

Landing page for a dental clinic in plain HTML, CSS and JavaScript, with no build step. Open `index.html` in a browser to view it.

## Files
- `index.html`: the page
- `js/main.js`: the WhatsApp links and the booking form, which sends to a Google Sheet. The settings are in `CONFIG` at the top.
- `assets/`: the design kit (styles, motion, layout, the photo-story script) and the photographs in `assets/img/`
- `google-apps-script.gs`: receives the form in a Google Sheet. Setup steps are at the top of the file.
- `credits.html`: credits for the stand-in photographs, which come from Wikimedia Commons

## Before launch
- Replace "Ivorel Dental" (a made-up stand-in name) with the clinic's real name in `index.html`, `js/main.js` and `favicon.svg`.
- Set the real WhatsApp number in `CONFIG.whatsapp` in `js/main.js`.
- Replace the stand-in photographs in `assets/img/` with photos of the clinic.
- Add the address, opening hours and a phone number once you have them.
