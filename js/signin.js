(function() {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function(form) {
            form.addEventListener('submit', function(event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                } else {
                    event.preventDefault()
                    form.classList.add('was-validated')
                    login()
                }
            }, false)
        })
})()

// Set up our login function
function login() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value

    auth.signInWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                last_login: new Date()
            }
            sessionStorage.setItem("user", user.uid);
            sessionStorage.setItem("email", user.email);
            // Push to Firebase Database
            database_ref.child('users/' + user.uid).update(user_data)

            // DOne
            window.location.replace("dashboard.html");

        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            document.getElementById("warning").style.display = "block";
            document.getElementById("warning_text").innerHTML = error.message;
        })
}