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





    document.getElementById("kirim").addEventListener("click", function () {
    // Ambil nilai input
    const nama = document.getElementById("nama");
    const telp = document.getElementById("telp");
    const email = document.getElementById("email");
    const pesan = document.getElementById("pesan");

    // Reset error
    [nama, telp, email, pesan].forEach(i => i.classList.remove("error"));

    let valid = true;

    // Validasi kosong
    if (nama.value.trim() === "") { nama.classList.add("error"); valid = false; }
    if (telp.value.trim() === "") { telp.classList.add("error"); valid = false; }
    if (email.value.trim() === "") { email.classList.add("error"); valid = false; }
    if (pesan.value.trim() === "") { pesan.classList.add("error"); valid = false; }

    if (!valid) return; // hentikan jika ada yang kosong

    // Nomor WhatsApp tujuan (format internasional)
    const nomorWA = "6285135056496";

    // Format pesan
    const text = 
`Halo, saya ingin mengirim pesan.

Nama: ${nama.value}
No Telp: ${telp.value}
Email: ${email.value}

Pesan:
${pesan.value}

Terima kasih.`;

    // Buka WhatsApp
    const url = `https://wa.me/${nomorWA}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
});






    function initMap() {
    // Lokasi yang ingin ditampilkan (contoh: Jakarta)
    const lokasi = { lat: -6.2088, lng: 106.8456 };

    // Buat maps
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: lokasi,
    });

    // Tambahkan marker
    const marker = new google.maps.Marker({
        position: lokasi,
        map: map,
        title: "Lokasi Kami"
    });
}
