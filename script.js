document.addEventListener("DOMContentLoaded", function() {
    console.log("Website loaded successfully!");
});
document.addEventListener("DOMContentLoaded", function() {
    console.log("Website loaded successfully!");
    hideLoader();
});

function showLoader() {
    document.getElementById('loader').style.display = 'flex';
}

function hideLoader() {
    document.getElementById('loader').style.display = 'none';
}

// Show loader when navigating to a new page
window.addEventListener('beforeunload', function() {
    showLoader();
});

// for images in the home page
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        dots[i].classList.remove("active");
    });
    slides[index].classList.add("active");
    dots[index].classList.add("active");
}

function moveSlide(step) {
    slideIndex += step;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    if (slideIndex >= slides.length) slideIndex = 0;
    showSlide(slideIndex);
}

function currentSlide(index) {
    slideIndex = index - 1;
    showSlide(slideIndex);
}

showSlide(slideIndex);
