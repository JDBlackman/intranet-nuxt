var firebaseConfig = {
  apiKey: "AIzaSyC9wHd99jEfmjPiby36lvtRjnLeQZjFCpU",
  authDomain: "cosi-7ff13.firebaseapp.com",
  databaseURL: "https://cosi-7ff13.firebaseio.com",
  projectId: "cosi-7ff13",
  storageBucket: "cosi-7ff13.appspot.com",
  messagingSenderId: "239976365239",
  appId: "1:239976365239:web:e268dd08fb93fc09"
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.usePublicVapidKey("BO2HBAtWQwxo7TTbCs5IcCocmXI-xZZj0PpfoJzRXO49FXxUL-E5ScRP6Ir3fVzi2JHrg7O1dUJYc5BsfMg4mGA");

messaging.requestPermission().then(function() {
  messaging.getToken().then(function(currentToken) {
    if (currentToken) {
      console.log(currentToken)
      var d = new Date;
      d.setTime(d.getTime() + 24*60*60*1000*31);
      document.cookie = "intranet-notification" + "=" + currentToken + ";path=/;expires=" + d.toGMTString();
    }
  }).catch(function(err) {
    console.log('An error occurred while retrieving token. ', err);
  });
}).catch(function(err) {
  console.log('Unable to get permission to notify.', err);
});


messaging.onMessage(function(payload) {
  var options = {
      body: payload.data.body,
      icon: 'https://i.imgur.com/9tDSAsA.png'
  };

  navigator.serviceWorker.register('notifs.js');
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification(payload.data.title, options);
      });
    }
  });

});
