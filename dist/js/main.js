function geo_success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    console.log(latitude);
    console.log(longitude);

    return { latitude, longitude };
}

function geo_error(error) {
    console.log('ERROR(' + error.code + '): ' + error.message);
}

if (!navigator.geolocation) {
    console.log('Geolocation is not supported by your browser');
} else {
    navigator.geolocation.getCurrentPosition(geo_success, geo_error);
    console.log(geo_success());
}