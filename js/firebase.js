var fireBase = fireBase || firebase;
var hasInit = false;
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCmvZ8joQh9zzZy0tN7YXsPlBPpBiGffXY",
    authDomain: "assessmentofcompetence.firebaseapp.com",
    projectId: "assessmentofcompetence",
    storageBucket: "assessmentofcompetence.appspot.com",
    messagingSenderId: "641997160494",
    appId: "1:641997160494:web:9186f6104693a40a611fbf"
};
// Initialize Firebase
if (!hasInit) {
    firebase.initializeApp(firebaseConfig);
    hasInit = true;
}
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()