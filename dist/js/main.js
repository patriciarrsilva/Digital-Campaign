/* GEOLOCATION */

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
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);
}

/* ADD TO HOME SCREEN */

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    // Update UI notify the user they can add to home screen
    btnAdd.style.display = 'block';
});

btnAdd.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    btnAdd.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice
        .then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
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