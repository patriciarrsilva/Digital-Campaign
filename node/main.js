/* Node.js server */
/*
 * Push the message from a Node.js server:
 * With the server running, run "node node/main.js" in the terminal
 */

const webPush = require('web-push');

// Subscription Object (this changes, so it's written in the console so we can update it for testing purposes)
const pushSubscription = { "endpoint": "https://fcm.googleapis.com/fcm/send/fSCrVM1D2Ro:APA91bGufc-DU2qD-zKduuY6OkXed0Pl5jPjSR1qEHYqClv6G7ywgLpEwl9AYuAZ0DVaxHlnGp3bv-hPGa7GxMgmcf_5XWaipGOBkm3IbnnbeyAFbMPNOnzen9GY0EfaJOLOb0a6I6_r", "expirationTime": null, "keys": { "p256dh": "BJp0fvk0o3GpruWfdlPLWUO5DOqB1Hdv4qEzWsg42-VPdxnVY_y6wrOjg_FDQOCuw-FMFlii_wz5iu2O1DPdgcY", "auth": "zlcuNun2U5P1xDkl0_eNJw" } };

const vapidPublicKey = 'BNDRz-ZFjAqEQ5CTbJPxXC74uL3Xmz3-PuA6SixRGjrfI0NCc6vWcaHHCunMY4oPvH7ZPWHu9vDV1dvUJ6p9Uhs';
const vapidPrivateKey = 'Bv8w3l9woJtK1aFoBjEwIPs2lqyDFGM96SyeRNIYqhA';

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