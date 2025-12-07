// HEADER STICKY
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


// HEADER RESPONSIVE
const menuToggle = document.getElementById("menu-toggle");
    const overlay = document.querySelector(".overlay");
    const closeBtn = document.querySelector(".close-btn");

    overlay.addEventListener("click", () => {
        menuToggle.checked = false;
    });

    closeBtn.addEventListener("click", () => {
        menuToggle.checked = false;
    });


// POP UP SHARE
document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("sharePopup");
    const closeBtn = document.getElementById("closePopup");
    const shareButtons = document.querySelectorAll(".artikel-share");
    let currentURL = "";

    shareButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            const artikelContent = btn.closest(".artikel-content");
            const articleLink = artikelContent.querySelector(".artikel-judul a");

            if (articleLink) {
                currentURL = articleLink.href;
            } else {
                currentURL = window.location.href;
            }

            document.getElementById("shareWA").href =
                `https://wa.me/?text=${encodeURIComponent(currentURL)}`;

            document.getElementById("shareFB").href =
                `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}`;

            document.getElementById("shareTW").href =
                `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentURL)}`;

            document.getElementById("shareLink").value = currentURL;

            popup.style.display = "flex";
        });
    });

    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });

    document.getElementById("copyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(currentURL);
        alert("Link artikel berhasil dicopy!");
    });

});


// VIEWS COUNT DATABASE
document.addEventListener("DOMContentLoaded", function () {

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQIgKGzPNVGZUZAl5OkhbzrbhNeKAznT-VKwV2FxjwJjED2UDOKcpdDisNewcG2gfjDw/exec";

  function animateValue(element, start, end, duration = 400) {
    if (start === end) { element.textContent = end; return; }
    const range = end - start;
    const startTime = performance.now();

    function step(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      element.textContent = Math.floor(start + range * progress);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const artikelSpans = {};
  document.querySelectorAll(".artikel-pengunjung").forEach(box => {
    const id = box.dataset.id;
    const span = box.querySelector(".view-count");
    artikelSpans[id] = span;

    const cached = localStorage.getItem(`view_${id}`);
    if (cached) span.textContent = cached;
  });

  async function loadAllViews() {
    try {
      const res = await fetch(`${SCRIPT_URL}?mode=all`);
      const data = await res.json();

      for (const id in data) {
        const span = artikelSpans[id];
        if (!span) continue;

        const current = parseInt(span.textContent) || 0;
        const newVal = parseInt(data[id]);
        animateValue(span, current, newVal, 300);

        localStorage.setItem(`view_${id}`, newVal);
      }
    } catch (e) { console.error(e); }
  }

  loadAllViews();
  document.querySelectorAll(".artikel-judul a").forEach(link => {
    link.addEventListener("click", async function () {
      const h1 = link.querySelector("h1");
      const id = h1.dataset.id;
      const span = artikelSpans[id];
      if (!span) return;

      const key = `viewed_${id}`;
      const now = Date.now();
      const last = sessionStorage.getItem(key);
      if (last && now - last < 10000) return;
      sessionStorage.setItem(key, now);

      try {
        const res = await fetch(`${SCRIPT_URL}?id=${encodeURIComponent(id)}&mode=add`, {
          method: "GET",
          keepalive: true
        });
        const data = await res.json();
        if (data.views !== undefined) {
          const current = parseInt(span.textContent) || 0;
          animateValue(span, current, data.views, 300);
          localStorage.setItem(`view_${id}`, data.views);
        }
      } catch (e) { console.error(e); }
    });
  });

  setInterval(loadAllViews, 2000);
});


// AUTO BACK HOME
document.querySelectorAll('.go-home').forEach(el => {
  el.href = window.location.origin;
});
