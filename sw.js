/* service worker file */

let cacheID = 'digital-campaign-v1';

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheID).then(cache => {
            console.log('Opened cache');
            // via localhost, remove all /digital-campaign prefixes from the items (at .addAll([items]))
            return cache
                .addAll([
                    '/digital-campaign/',
                    '/digital-campaign/sw.js',
                    '/digital-campaign/manifest.json',
                    '/digital-campaign/index.html',
                    '/digital-campaign/html/location.html',
                    '/digital-campaign/html/home.html',
                    '/digital-campaign/html/amizade.html',
                    '/digital-campaign/css/style.css',
                    '/digital-campaign/fonts/DINCond-BlackAlternate.otf',
                    '/digital-campaign/js/sw-register.js',
                    '/digital-campaign/js/year.js',
                    '/digital-campaign/js/location.js',
                    '/digital-campaign/js/slider.js',
                    '/digital-campaign/js/sidepanel.js',

                ])
                .catch(err => {
                    console.log('Caches open failed: ' + err);
                });
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames
                    .filter(cacheName => {
                        return (
                            cacheName.startsWith('digital-campaign-v') &&
                            cacheName != cacheID
                        );
                    })
                    .map(cacheName => {
                        return caches.delete(cacheName);
                    })
            );
        })
    );
});

self.addEventListener('fetch', event => {
    let requestUrl = new URL(event.request.url);

    if (requestUrl.origin === location.origin) {
        if (requestUrl.pathname === '/') {
            event.respondWith(caches.match('/'));
            return;
        }
    }

    event.respondWith(
        caches.match(event.request).then(response => {
            return response || fetch(event.request);
        })
    );
});

/* handle notifications */

// Handle the notificationclose event
self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});

// Handle the notificationclick event
self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    // const primaryKey = notification.data.primaryKey;
    const action = event.action;

    if (action === 'close') {
        notification.close();
    } else {
        event.waitUntil(
            clients.matchAll().then(clis => {
                const client = clis.find(c => {
                    return c.visibilityState === 'visible';
                });

                // open a (custom) page
                if (client !== undefined) {
                    client.navigate('https://www.licorbeirao.com');
                    client.focus();
                } else {
                    // there are no visible windows. Open one.
                    clients.openWindow('https://www.licorbeirao.com');
                    notification.close();
                }
            })
        );
    }

    // close all notifications when one is clicked
    self.registration.getNotifications().then(notifications => {
        notifications.forEach(notification => {
            notification.close();
        });
    });
});

/* add push event listener - deliver data to the service worker using a push message
 * Here, we're getting the data payload as text and setting it as the body of the notification
 * Necessary to handle the notifications in the client
 */
self.addEventListener('push', event => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Default body';
    }

    const options = {
        body: body,
        icon: 'img/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
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
    event.waitUntil(
        clients.matchAll().then(c => {
            console.log(c);
            if (c.length === 0) {
                // Show notification
                self.registration.showNotification('Push Notification', options);
            } else {
                // Send a message to the page to update the UI
                console.log('Application is already open!');
            }
        })
    );
});
