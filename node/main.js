/* Node.js server */
/*
 * Push the message from a Node.js server:
 * With the server running, run "node node/main.js" in the terminal
 */

const webPush = require('web-push');

// Subscription Object (this changes, so it's written in the console so we can update it for testing purposes)
const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/cooJ-_mpuGk:APA91bGQOufUtOFwsh5NpZ32E15w7YJrjzZMIVMxgn1QGNyoKs-fCqfhFQ0rVBOaxvc_RWGVZehUz2UoVyFPsfpgmQEMS4YODZie8CMSvK44pmAMHCtQ1lcwO5ucScbTDC-yXB6FOseZ", "expirationTime": null, "keys": { "p256dh": "BNQNfqtPH1DhZ7PTh6Cx1W4O7LTB3wpFXDf3KtajztqH8PmCPzTM_2ohZAp3nBWLRWkd87jrVJqDnM1Jf9Ukjvs", "auth": "HLuq1ENGLHK4w8ww8JH8zw" } };

const vapidPublicKey = 'BDTVS9PfScWnyqk6EVxccqT6DqOZhlQfQ8YJ-C7AcEEvr0vIZ2NK_0g6qFLZ1AXlSeC5V2fcitHPOk0QgNhwUjY';
const vapidPrivateKey = 'PaJCQBtqrG3Ql0OvlhUD0pnauzrLoO3qO2tGlHvRMLQ';

const payload = 'Here is a payload!';

const options = {
    // gcmAPIKey: 'YOUR_SERVER_KEY',
    TTL: 60,
    vapidDetails: {
        subject: 'mailto:prrs89@gmail.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);