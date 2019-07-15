/* SLIDESHOW */
let slideIndex = 1;

function showSlides(n) {
    const slides = document.getElementsByClassName("mySlides");
    const dots = document.getElementsByClassName("dot");

    // if we reach the end of the slideshow, go back to the beginning
    if (n > slides.length) {
        slideIndex = 1
    }

    // if we go further than the start of the slideshow, go back to the end
    if (n < 1) {
        slideIndex = slides.length
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

/* Register service worker to control making site work offline */

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

const locationBtn = document.querySelector('.location-button');

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
});

/* ADD TO HOME SCREEN */

let deferredPrompt;
const addBtn = document.querySelector('.add-button');

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI to notify the user they can add to home screen
    addBtn.style.display = 'block';

    addBtn.addEventListener('click', (e) => {
        // hide our user interface that shows our A2HS button
        addBtn.style.display = 'none';
        // Show the prompt
        deferredPrompt.prompt();
        // Wait for the user to respond to the prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});