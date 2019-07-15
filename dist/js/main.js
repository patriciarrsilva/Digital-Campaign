const geo_success = position => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    let coordinates = {
        latitude,
        longitude
    }

    console.log(latitude);
    console.log(longitude);

    return coordinates;
}

const geo_error = error => {
    return `ERROR(${error.code}): ${error.message}`;
}

if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
} else {
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);
}