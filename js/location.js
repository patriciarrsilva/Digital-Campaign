/* GEOLOCATION */

const locationBtn = document.querySelector('.location-button');

function geo_success(position) {
    // TODO: show some indication that location is being processed (e.g. spinner)
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const coordinates = {
        latitude,
        longitude
    }

    console.log(coordinates);

    window.location.href = "./home.html";

    // in the real app, save the coordinates to the backend
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