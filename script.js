window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 10) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});


/////////
const menuToggle = document.getElementById("menu-toggle");
    const overlay = document.querySelector(".overlay");
    const closeBtn = document.querySelector(".close-btn");

    // klik overlay tutup menu
    overlay.addEventListener("click", () => {
        menuToggle.checked = false;
    });

    // klik tombol silang tutup menu
    closeBtn.addEventListener("click", () => {
        menuToggle.checked = false;
    });




let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
    slides.forEach(slide => slide.classList.remove("active"));

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = 1;

    slides[slideIndex - 1].classList.add("active");

    setTimeout(showSlides, 3000); // 3 detik
}

showSlides();


///// MERCHANDISE – ULTRA SMOOTH (NO FLICKER) /////

const slider = document.querySelector(".slider-track");
let cards = document.querySelectorAll(".merch-content");

const gap = 20;
let cardWidth = cards[0].offsetWidth + gap;

// Clone SET sebanyak 2x di depan & belakang (buffer panjang)
function createClones() {
    const clonesBefore = [];
    const clonesAfter = [];

    cards.forEach(card => clonesAfter.push(card.cloneNode(true)));
    cards.forEach(card => clonesAfter.push(card.cloneNode(true)));

    cards.forEach(card => clonesBefore.push(card.cloneNode(true)));
    cards.forEach(card => clonesBefore.push(card.cloneNode(true)));

    clonesAfter.forEach(clone => slider.appendChild(clone));
    clonesBefore.reverse().forEach(clone => slider.insertBefore(clone, slider.firstChild));
}

createClones();

// Refresh cards after cloning
cards = document.querySelectorAll(".merch-content");

const realLength = cards.length / 5;  // jumlah asli (3)
let index = realLength * 2;           // mulai pas di tengah set asli

slider.style.transform = `translateX(-${cardWidth * index}px)`;

// Resize fix
window.addEventListener("resize", () => {
    cardWidth = cards[0].offsetWidth + gap;
    slider.style.transition = "none";
    slider.style.transform = `translateX(-${cardWidth * index}px)`;
});

// Tombol
function rightSlide() {
    index++;
    move();
}

function leftSlide() {
    index--;
    move();
}

// Gerakan utama
function move() {
    slider.style.transition = "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    slider.style.transform = `translateX(-${cardWidth * index}px)`;

    slider.addEventListener("transitionend", fixIndex, { once: true });
}

// Reset tanpa terlihat sama sekali
function fixIndex() {

    const start = realLength * 2;
    const end = (realLength * 3) - 1;

    // Jika terlalu kanan
    if (index > end) {
        slider.style.transition = "none";

        requestAnimationFrame(() => {
            index = start;
            slider.style.transform = `translateX(-${cardWidth * index}px)`;
        });
    }

    // Jika terlalu kiri
    if (index < realLength) {
        slider.style.transition = "none";

        requestAnimationFrame(() => {
            index = end - 1;
            slider.style.transform = `translateX(-${cardWidth * index}px)`;
        });
    }
}



////////////////



document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("sharePopup");
    const closeBtn = document.getElementById("closePopup");
    const shareButtons = document.querySelectorAll(".artikel-share");
    let currentURL = "";

    shareButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            // Cari container artikel terdekat
            const artikelContent = btn.closest(".artikel-content");

            // Ambil link dari <a> di dalam artikel tersebut
            const articleLink = artikelContent.querySelector(".artikel-judul a");

            // Jika link ditemukan, gunakan sebagai currentURL
            if (articleLink) {
                currentURL = articleLink.href;
            } else {
                currentURL = window.location.href;
            }

            // Update link share
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

    // Close popup
    closeBtn.addEventListener("click", () => {
        popup.style.display = "none";
    });

    // Klik area gelap → tutup popup
    popup.addEventListener("click", (e) => {
        if (e.target === popup) {
            popup.style.display = "none";
        }
    });

    // Tombol copy
    document.getElementById("copyBtn").addEventListener("click", () => {
        navigator.clipboard.writeText(currentURL);
        alert("Link artikel berhasil dicopy!");
    });

});



let position = 0;
const track = document.querySelector(".gallery-content");
const items = document.querySelectorAll(".gallery");
const total = items.length;

function getSlideWidth() {
    return items[0].clientWidth; 
}

function nextSlide() {
    const width = getSlideWidth();
    position -= width;
    track.style.transition = "0.4s ease-in-out";
    track.style.transform = `translateX(${position}px)`;

    setTimeout(() => {
        if (Math.abs(position) >= (width * (total / 2))) {
            track.style.transition = "none";
            position = 0;
            track.style.transform = `translateX(${position}px)`;
        }
    }, 400);
}

function prevSlide() {
    const width = getSlideWidth();
    position += width;
    track.style.transition = "0.4s ease-in-out";
    track.style.transform = `translateX(${position}px)`;

    setTimeout(() => {
        if (position > 0) {
            track.style.transition = "none";
            position = -width * (total / 2);
            track.style.transform = `translateX(${position}px)`;
        }
    }, 400);
}

/* ==== POPUP (Tetap sama) ==== */
items.forEach(item => {
    item.addEventListener("click", () => {
        const imgSrc = item.querySelector("img").src;
        document.getElementById("popup-img").src = imgSrc;
        document.getElementById("popup").style.display = "flex";
    });
});

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

document.getElementById("popup").addEventListener("click", function(e) {
    if (e.target === this) closePopup();
});





document.addEventListener("DOMContentLoaded", function () {

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzQIgKGzPNVGZUZAl5OkhbzrbhNeKAznT-VKwV2FxjwJjED2UDOKcpdDisNewcG2gfjDw/exec";

  // ANIMASI HALUS
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

  // AMBIL SEMUA SPAN
  const artikelSpans = {};
  document.querySelectorAll(".artikel-pengunjung").forEach(box => {
    const id = box.dataset.id;
    const span = box.querySelector(".view-count");
    artikelSpans[id] = span;

    // Tampilkan cached value dulu (jika ada) supaya tidak flash 0
    const cached = localStorage.getItem(`view_${id}`);
    if (cached) span.textContent = cached;
  });

  // =============================
  // LOAD SEMUA DATA DARI SERVER
  // =============================
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

        localStorage.setItem(`view_${id}`, newVal); // simpan cache
      }
    } catch (e) { console.error(e); }
  }

  // Jalankan pertama kali
  loadAllViews();

  // =============================
  // TAMBAH VIEW SAAT KLIK
  // =============================
  document.querySelectorAll(".artikel-judul a").forEach(link => {
    link.addEventListener("click", async function () {
      const h1 = link.querySelector("h1");
      const id = h1.dataset.id;
      const span = artikelSpans[id];
      if (!span) return;

      const key = `viewed_${id}`;
      const now = Date.now();
      const last = sessionStorage.getItem(key);
      if (last && now - last < 10000) return; // 1 view per 10 detik
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

  // =============================
  // REALTIME UPDATE
  // =============================
  setInterval(loadAllViews, 2000); // update tiap 2 detik
});











document.querySelectorAll('.go-home').forEach(el => {
  el.href = window.location.origin;
});