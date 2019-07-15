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

// Determine if the app was successfully installed
window.addEventListener('appinstalled', (evt) => {
    console.log('a2hs installed');
});

// Detecting if your app is launched from the home screen
// Safari
if (window.navigator.standalone === true) {
    console.log('display-mode is standalone');
}
// Other
if (window.matchMedia('(display-mode: standalone)').matches) {
    console.log('display-mode is standalone');
}

/* GEOLOCATION */

const locationBtn = document.querySelector('.location-button');

const geo_success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordinates = {
        latitude,
        longitude
    }

    console.log(coordinates);

    return coordinates;
}

const geo_error = error => {
    const errorString = `ERROR(${error.code}): ${error.message}`

    console.log(errorString);

    return errorString;
}

if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
} else {
    locationBtn.addEventListener('click', navigator.geolocation.getCurrentPosition(geo_success, geo_error));
}