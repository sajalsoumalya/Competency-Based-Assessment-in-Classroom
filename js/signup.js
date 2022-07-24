// Example starter JavaScript for disabling form submissions if there are invalid fields
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
                    register()
                }
            }, false)

        })
})()


// Set up our register function
function register() {
    // Get all our input fields
    email = document.getElementById('email').value
    password = document.getElementById('password').value
    f_name = document.getElementById('f_name').value
    l_name = document.getElementById('l_name').value
    designation = document.getElementById('designation').value
    c_code = document.getElementById('c_code').value
    mobile = document.getElementById('mobile').value


    // Move on with Auth
    auth.createUserWithEmailAndPassword(email, password)
        .then(function() {
            // Declare user variable
            var user = auth.currentUser

            // Add this user to Firebase Database
            var database_ref = database.ref()

            // Create User data
            var user_data = {
                email: email,
                f_name: f_name,
                l_name: l_name,
                designation: designation,
                c_code: c_code,
                mobile: mobile,
                account_created: new Date()
            }

            // Push to Firebase Database
            database_ref.child('users/' + user.uid).set(user_data)

            // DOne
            document.getElementById("success").style.display = "block";
            setTimeout(function() { window.location.href = './signin.html'; }, 2000);

        })
        .catch(function(error) {
            // Firebase will use this to alert of its errors
            var error_code = error.code
            var error_message = error.message

            document.getElementById("warning").style.display = "block";
            document.getElementById("warning_text").innerHTML = error.message;
        })
}