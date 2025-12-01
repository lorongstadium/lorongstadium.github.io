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
    overlay.addEventListener("click", () => {
        menuToggle.checked = false;
    });
    closeBtn.addEventListener("click", () => {
        menuToggle.checked = false;
    });


    
    ///// pop up gallery
function openPopup(src) {
    document.getElementById("popup-img").src = src;
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// klik dimana saja di area popup (termasuk gambar) langsung close

document.getElementById("popup").addEventListener("click", function(e) {
    if (e.target === this) closePopup();
});

// tombol silang tetap berfungsi normal
document.querySelector(".close-popup").addEventListener("click", function (e) {
    e.stopPropagation();
    closePopup();
});


