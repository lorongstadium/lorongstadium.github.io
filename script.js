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



/////////////////
document.addEventListener("DOMContentLoaded", () => {

    const popup = document.getElementById("sharePopup");
    const closeBtn = document.getElementById("closePopup");
    const shareButtons = document.querySelectorAll(".artikel-share");
    let currentURL = "";

    // Ketika tombol share artikel diklik
    shareButtons.forEach(btn => {
        btn.addEventListener("click", () => {

            currentURL = window.location.href;

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

    // Klik area hitam → tutup popup
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





document.addEventListener("DOMContentLoaded", function(){

  const titles = document.querySelectorAll(".artikel-judul h1");

  titles.forEach(function(title){

    const id = title.dataset.id;
    const viewBox = document.querySelector('.artikel-pengunjung[data-id="' + id + '"]');
    const counter = viewBox.querySelector("p");

    // Ambil data tersimpan
    let count = localStorage.getItem("view-" + id);

    if(count === null){
        count = 0;
    } else {
        count = parseInt(count);
    }

    // Tampilkan ke layar
    counter.textContent = count;

    // Saat judul diklik
    title.addEventListener("click", function(){
        count++;
        localStorage.setItem("view-" + id, count);
        counter.textContent = count;
    });

  });

});