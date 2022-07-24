// creating an array and passing the number, questions, options, and answers


var url = window.location.href;
var quizid = url.substring(url.lastIndexOf('?') + 1);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child("Quiz/" + quizid + "/Questions");

let questions = [];

usersRef.on("value", (snap) => {
    snap.forEach((childSnap) => {
        let key = childSnap.key,
            value = childSnap.val();
        let que = {
            numb: childSnap.val().numb,
            question: childSnap.val().Question,
            answer: childSnap.val().Answer,
            options: [
                childSnap.val().Options1,
                childSnap.val().Options2,
                childSnap.val().Options3,
                childSnap.val().Options4
            ]
        };
        questions.push(que);

    });
    console.log(questions);
});