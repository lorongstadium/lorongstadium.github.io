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


// FORM CONTACT US
    document.getElementById("kirim").addEventListener("click", function () {

    const nama = document.getElementById("nama");
    const telp = document.getElementById("telp");
    const email = document.getElementById("email");
    const pesan = document.getElementById("pesan");

    [nama, telp, email, pesan].forEach(i => i.classList.remove("error"));

    let valid = true;

    if (nama.value.trim() === "") { nama.classList.add("error"); valid = false; }
    if (telp.value.trim() === "") { telp.classList.add("error"); valid = false; }
    if (email.value.trim() === "") { email.classList.add("error"); valid = false; }
    if (pesan.value.trim() === "") { pesan.classList.add("error"); valid = false; }

    if (!valid) return;

    const nomorWA = "6285135056496";
    const text = 
`Halo, saya ingin mengirim pesan.

Nama: ${nama.value}
No Telp: ${telp.value}
Email: ${email.value}

Pesan:
${pesan.value}

Terima kasih.`;

    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
});


// LOCATION
    function initMap() {
    const lokasi = { lat: -6.2088, lng: 106.8456 };

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: lokasi,
    });

    const marker = new google.maps.Marker({
        position: lokasi,
        map: map,
        title: "Lokasi Kami"
    });
}


// AUTO BACK HOME
document.querySelectorAll('.go-home').forEach(el => {
  el.href = window.location.origin;
});