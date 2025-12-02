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



    
    

///////////
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