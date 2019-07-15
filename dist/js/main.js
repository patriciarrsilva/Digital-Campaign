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