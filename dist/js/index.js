/* SLIDESHOW */
const slideshow = document.getElementsByClassName("slideshow-container");
let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // if we reach the end of the slideshow, go back to the beginning
    if (n > slides.length) {
        slideIndex = 1;
    }

    // if we go further than the start of the slideshow, go back to the end
    if (n < 1) {
        slideIndex = slides.length;
    }


    // Hide all slides
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove the active class from all dots
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the selected slide
    slides[slideIndex - 1].style.display = "block";

    // Add the active class to the selected dot
    dots[slideIndex - 1].className += " active";
}

showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// Touch support for slideshow
let hammer = new Hammer(slideshow);

hammer.on('swipeleft', plusSlides(-1));
hammer.on('swiperight', plusSlides(1));

/* REGISTER SERVICE WORKER TO CONTROL MAKING SITE WORK OFFLINE */

if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
        navigator.serviceWorker
            .register('./sw.js')
            .then(registration => {
                // Registration was successful
                console.log('ServiceWorker registration successful with scope: ', registration.scope);
            })
            .catch(err => {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

/* GEOLOCATION */

/*const locationBtn = document.querySelector('.location-button');

function geo_success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordinates = {
        latitude,
        longitude
    }

    console.log(coordinates);

    return coordinates;
}

function geo_error(error) {
    const errorString = `ERROR(${error.code}): ${error.message}`

    console.log(errorString);

    return errorString;
}

locationBtn.addEventListener('click', function () {
    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        navigator.geolocation.getCurrentPosition(geo_success, geo_error);
    }
});*/