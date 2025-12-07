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


// FORM PENDAFTARAN
const apiProv = "https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json";
const apiKota = id => `https://www.emsifa.com/api-wilayah-indonesia/api/regencies/${id}.json`;
const apiKecamatan = id => `https://www.emsifa.com/api-wilayah-indonesia/api/districts/${id}.json`;
const apiKelurahan = id => `https://www.emsifa.com/api-wilayah-indonesia/api/villages/${id}.json`;

window.onload = () => {
    fetch(apiProv)
        .then(res => res.json())
        .then(data => {
            const prov = document.getElementById("provinsi");
            prov.innerHTML = data
                .map(p => `<option value="${p.name}" data-id="${p.id}">${p.name}</option>`)
                .join("");

            setTimeout(() => { updateKota(); hitungHarga(); }, 100);
        });
};

function updateKota() {
    const provSelect = document.getElementById("provinsi");
    const provID = provSelect.options[provSelect.selectedIndex].dataset.id;

    fetch(apiKota(provID))
        .then(res => res.json())
        .then(data => {
            const kota = document.getElementById("kota");
            kota.innerHTML = data
                .map(k => `<option value="${k.name}" data-id="${k.id}">${k.name}</option>`)
                .join("");
            updateKecamatan();
        });
}

function updateKecamatan() {
    const kotaSelect = document.getElementById("kota");
    const kotaID = kotaSelect.options[kotaSelect.selectedIndex].dataset.id;

    fetch(apiKecamatan(kotaID))
        .then(res => res.json())
        .then(data => {
            const kec = document.getElementById("kecamatan");
            kec.innerHTML = data
                .map(kc => `<option value="${kc.name}" data-id="${kc.id}">${kc.name}</option>`)
                .join("");
            updateKelurahan();
        });
}

function updateKelurahan() {
    const kecSelect = document.getElementById("kecamatan");
    const kecID = kecSelect.options[kecSelect.selectedIndex].dataset.id;

    fetch(apiKelurahan(kecID))
        .then(res => res.json())
        .then(data => {
            const kel = document.getElementById("kelurahan");
            kel.innerHTML = data
                .map(kl => `<option value="${kl.name}">${kl.name}</option>`)
                .join("");
        });
}

function hitungHarga() {
    const qty = document.getElementById("qty").value;
    const harga = 15000 * qty;
    document.getElementById("harga").value = harga.toLocaleString("id-ID");
}


// FORM MESSAGE
document.getElementById("kirim").addEventListener("click", function(event) {
    event.preventDefault();

    const fields = [
        "nama",
        "telp",
        "email",
        "qty",
        "provinsi",
        "kota",
        "kecamatan",
        "kelurahan",
        "alamat"
    ];

    let isValid = true;

    fields.forEach(id => {
        const el = document.getElementById(id);

        if (!el.value || el.value.trim() === "") {
            el.classList.add("input-error");
            isValid = false;
        } else {
            el.classList.remove("input-error");
        }
    });

    if (!isValid) {
        alert("Harap isi semua data terlebih dahulu.");
        return;
    }

    const nama = document.getElementById("nama").value;
    const telp = document.getElementById("telp").value;
    const email = document.getElementById("email").value;
    
    const qty = document.getElementById("qty").value;
    const provinsi = document.getElementById("provinsi").value;
    const kota = document.getElementById("kota").value;
    const kecamatan = document.getElementById("kecamatan").value;
    const kelurahan = document.getElementById("kelurahan").value;
    const alamat = document.getElementById("alamat").value;
    const pesan = document.getElementById("pesan").value;
    const harga = document.getElementById("harga").value;

    const phoneNumber = "6285135056496";

    const text =
`Halo, saya ingin memesan produk.

Nama: ${nama}
No Telp: ${telp}
Email: ${email}

Jumlah: ${qty}

Provinsi: ${provinsi}
Kota/Kabupaten: ${kota}
Kecamatan: ${kecamatan}
Kelurahan: ${kelurahan}

Alamat Lengkap:
${alamat}

Pesan tambahan:
${pesan}

Total Harga: ${harga}

Terima kasih.`;

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
});


// IMAGE PRODUCT SLIDER
const track = document.querySelector('.track');
const slides = document.querySelectorAll('.track img');
const slider = document.querySelector('.items-img');

let index = 0;
let total = slides.length;
let width = slider.clientWidth;

slides.forEach(img => {
  const clone = img.cloneNode(true);
  track.appendChild(clone);
});

function updateWidth() {
  width = slider.clientWidth;
}
window.addEventListener('resize', updateWidth);

function slideNext() {
  index++;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${index * width}px)`;

  if (index === total) {
    setTimeout(() => {
      track.style.transition = "none";
      track.style.transform = `translateX(0)`;
      index = 0;
    }, 500);
  }
}

function slidePrev() {
  if (index === 0) {
    track.style.transition = "none";
    track.style.transform = `translateX(-${total * width}px)`;
    index = total;

    setTimeout(() => {
      slidePrev();
    }, 20);
    return;
  }

  index--;
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(-${index * width}px)`;
}

document.querySelector('.next').onclick = slideNext;
document.querySelector('.prev').onclick = slidePrev;

let startX = 0;
let endX = 0;

slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

slider.addEventListener('touchmove', (e) => {
  endX = e.touches[0].clientX;
});

slider.addEventListener('touchend', () => {
  if (startX - endX > 50) {
    slideNext();
  } 
  if (endX - startX > 50) {
    slidePrev();
  }
});


/* ===== POPUP IMAGE ===== */
const popup = document.getElementById('popupImgBox');
const popupImg = document.getElementById('popupImg');
const closeButton = document.querySelector('.close-popup');

document.querySelectorAll('.track img').forEach(img => {
  img.addEventListener('click', () => {
    popup.style.display = "flex";
    popupImg.src = img.src;
    document.body.style.overflow = "hidden";
  });
});

closeButton.addEventListener('click', () => {
  popup.style.display = "none";
  document.body.style.overflow = "auto";
});

popup.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
    document.body.style.overflow = "auto";
  }
});


// AUTO BACK HOME
document.querySelectorAll('.go-home').forEach(el => {
  el.href = window.location.origin;
});