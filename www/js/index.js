//document.addEventListener('deviceready', function() {
	//initializePushNote();
//}, false);

document.addEventListener('deviceready', function() {
    checkAndroidPermissions();
}, false);

function checkAndroidPermissions(){
    cordova.plugins.permissions.hasPermission(cordova.plugins.permissions.NOTIFICATION, function(status) {
        if (!status.hasPermission) {
            cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.NOTIFICATION, function(status) {
                if (!status.hasPermission) {
                    console.warn("Notification permission not granted");
					document.getElementById("errorid").innerHTML = "Notification permission not granted";
                }else{
					initializePushNote();
				}
            });
        }
    });
}

function initializePushNote(){
	
    const push = PushNotification.init({
		
			android: {
						icon: 'note',
						iconColor: 'blue'
					 },
					 
			browser: {
				
				pushServiceURL: 'http://push.api.phonegap.com/v1/push'
				
			},
			
			ios: {
				alert: "true",
				badge: "true",
				sound: "true"
			},
			
			windows: {}
    });

    push.on('registration', function(data) {
		
		document.getElementById("devdid").innerHTML = data.registrationId;
		
    });

    push.on('notification', function(data) {
		console.log(data.message);
		console.log(data.title);
		console.log(data.count);
		console.log(data.sound);
		console.log(data.image);
		console.log(data.additionalData);
    });

    push.on('error', function(e) {
        console.error("Push notification error:", e.message);
    });
}