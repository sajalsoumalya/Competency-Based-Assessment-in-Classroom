let mainApp = {};
(function() {
    var mainContainer = document.getElementById("main_container");

    var logtout = function() {
        firebase.auth().signOut().then(function() {
            console.log('success');
            window.location.replace("signin.html");
        }, function() {})
    }

    var init = function() {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // User is signed in.
                console.log("Logged In");

                let email = user.email;
                console.log(email);
                console.log(user.uid);
            } else {
                // No user is signed in.
                console.log("redirect");
                window.location.replace("signin.html");
            }
        });
    }

    init();

    mainApp.logout = logtout;
})();