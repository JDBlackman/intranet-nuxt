// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/6.0.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/6.0.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
firebase.initializeApp({
  'messagingSenderId': '103953800507'
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();



messaging.setBackgroundMessageHandler(function(payload) {
  console.log(payload)
  // Customize notification here
  var notificationTitle =  payload.data.title
  var notificationOptions = {
    body: payload.data.body,
    icon: 'https://i.imgur.com/9tDSAsA.png'
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});
