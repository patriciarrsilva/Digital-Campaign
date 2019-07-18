/* main JavaScript for the app */

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});

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

/* SERVICE WORKER */

const app = (() => {
    'use strict';

    let isSubscribed = false;
    let swRegistration = null;

    // const notifyButton = document.querySelector('.js-notify-btn'); // Notify me!
    // const pushButton = document.querySelector('.js-push-btn'); // Enable Push Messaging

    // check for notification support (the real app should perform some logic to compensate for lack of support)
    if (!('Notification' in window)) {
        console.log('Notifications not supported in this browser');
        return;
    }

    // request permission to show notifications (the real app should request permission when a user opts into a specific feature that requires it)
    Notification.requestPermission(status => {
        console.log('Notification permission status:', status);
    });


    // display a Notification (here, for demonstration purposes)
    /*function displayNotification() {
        if (Notification.permission == 'granted') {
            navigator.serviceWorker.getRegistration().then(reg => {

                // Add 'options' object to configure the notification
                const options = {
                    body: 'First notification!',
                    // add a tag to the notification
                    // tag: 'id1',
                    icon: 'img/notification-flat.png',
                    vibrate: [100, 50, 100],
                    data: {
                        dateOfArrival: Date.now(),
                        primaryKey: 1 // unique property to determine which notification was called
                    },
                    // add actions to the notification
                    actions: [
                        {
                            action: 'explore', title: 'Go to the site',
                            icon: 'img/checkmark.png'
                        },
                        {
                            action: 'close', title: 'Close the notification',
                            icon: 'img/xmark.png'
                        },
                    ]
                };

                reg.showNotification('Hello world!', options);
            });
        }
    }*/


    // Set the initial subscription value
    function initializeUI() {
        // add a click event listener to the "Enable Push" button
        /*pushButton.addEventListener('click', () => {
            pushButton.disabled = true;
            if (isSubscribed) {
                unsubscribeUser();
            } else {
                subscribeUser();
            }
        });*/

        swRegistration.pushManager.getSubscription()
            .then(subscription => {
                isSubscribed = (subscription !== null);

                updateSubscriptionOnServer(subscription);

                if (isSubscribed) {
                    console.log('User IS subscribed.');
                } else {
                    console.log('User is NOT subscribed.');
                }

                updateBtn();
            });
    }

    // add VAPID public key
    const applicationServerPublicKey = 'BPACQA4C5Kc5-VYEPFGByrUpwEp_NU-bKqRsWCPZB63b1ibg1cjaAC6a_7DxlLy35g4RgWU6xwSipu2nPactiD8';

    // subscribe to the push service
    function subscribeUser() {
        const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);

        swRegistration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: applicationServerKey
        })
            .then(subscription => {
                console.log('User is subscribed:', subscription);

                updateSubscriptionOnServer(subscription);

                isSubscribed = true;

                updateBtn();
            })
            .catch(err => {
                if (Notification.permission === 'denied') {
                    console.warn('Permission for notifications was denied');
                } else {
                    console.error('Failed to subscribe the user: ', err);
                }
                updateBtn();
            });
    }

    // unsubscribe from the push service
    function unsubscribeUser() {
        swRegistration.pushManager.getSubscription()
            .then(subscription => {
                if (subscription) {
                    return subscription.unsubscribe();
                }
            })
            .catch(err => {
                console.log('Error unsubscribing', err);
            })
            .then(() => {
                updateSubscriptionOnServer(null);

                console.log('User is unsubscribed');
                isSubscribed = false;

                updateBtn();
            });
    }

    /*
     * In the final app, this is where we would update the subscription object for this user on the server.
     * Here, updateSubscriptionOnServer() console.log()'s the subscription object to the page
     */
    function updateSubscriptionOnServer(subscription) {
        if (subscription) {
            const subscriptionObject = JSON.stringify(subscription);
            const endpointUrl = subscription.endpoint;
            console.log(`Subscription Object: ${subscriptionObject}, Endpoint URL: ${endpointUrl}`);
        } else {
            console.log('No subscription');
        }
    }

    function updateBtn() {
        if (Notification.permission === 'denied') {
            // pushButton.textContent = 'Push Messaging Blocked';
            // pushButton.disabled = true;
            updateSubscriptionOnServer(null);
            return;
        }

        /*if (isSubscribed) {
            pushButton.textContent = 'Disable Push Messaging';
        } else {
            pushButton.textContent = 'Enable Push Messaging';
        }

        pushButton.disabled = false;*/
    }

    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding)
            .replace(/\-/g, '+')
            .replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    /*notifyButton.addEventListener('click', () => {
        displayNotification();
    });*/

    // register service worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            console.log('Service Worker and Push is supported');

            navigator.serviceWorker.register('sw.js')
                .then(swReg => {
                    console.log('Service Worker is registered', swReg);

                    swRegistration = swReg;

                    initializeUI();
                })
                .catch(err => {
                    console.error('Service Worker Error', err);
                });
        });
    } else {
        console.warn('Push messaging is not supported');
        // pushButton.textContent = 'Push Not Supported';
    }

})();
