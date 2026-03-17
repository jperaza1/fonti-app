importScripts('./ngsw-worker.js');

(function () {
    'use strict';

    self.addEventListener('notificationclick', (event) => {
        console.log(event);
        console.log("This is custom service worker notificationclick method.");
        console.log('Notification details: ', event.notification);
        // Write the code to open
            event.waitUntil(clients.openWindow('/driver-leg/myleg'));
    });
}
    ());

// line 1932
    // this.scope.addEventListener('notificationclick', (event) => {
    //     event.notification.close();
    //     if (clients.openWindow && event.notification.actions) {
    //         event.waitUntil(clients.openWindow(event.notification.actions[0].action));
    //     }
    // });