document.getElementById("welcome").innerHTML = "Welcome " + sessionStorage.getItem("email");

// !IMPORTANT: REPLACE WITH YOUR OWN CONFIG OBJECT BELOW

// Initialize Firebase


// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child("Quiz");

var random = Math.floor(Math.random() * 100000000000000) + 1;
var current = new Date();
var current2 = Date.parse(current);
BlogId = "RSLIL" + current2 + random;
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
year = current.getFullYear();
month = months[current.getMonth()];
date = current.getDate();
day = days[current.getDay()];

today = day + "," + month + " " + date + ", " + year;
let author = sessionStorage.getItem("email")

$("#today").val(today);
$("#author").val(author);


readUserData();

// --------------------------
// READ
// --------------------------
function readUserData() {
    const userListUI = document.getElementById("user-list");

    usersRef.orderByChild('author')
        .equalTo(author).on("value", (snap) => {
            userListUI.innerHTML = "";

            snap.forEach((childSnap) => {
                let key = childSnap.key,
                    value = childSnap.val();

                let $li = document.createElement("tr");
                // edit icon
                let editIconUI = document.createElement("span");
                editIconUI.classList.add("fa");

                editIconUI.classList.add("fa-pen");
                editIconUI.setAttribute("userid", key);
                editIconUI.addEventListener("click", editButtonClicked);

                // delete icon
                let deleteIconUI = document.createElement("span");
                deleteIconUI.classList.add("fa");
                deleteIconUI.classList.add("fa-minus-circle"); //<i class="fas fa-minus-circle"></i>
                deleteIconUI.setAttribute("userid", key);
                deleteIconUI.addEventListener("click", deleteButtonClicked);

                // set question icon
                let setQueUI = document.createElement("span");
                setQueUI.classList.add("fa");
                setQueUI.classList.add("fa-arrow-right"); //<i class="fas fa-minus-circle"></i>
                setQueUI.setAttribute("userid", key);
                setQueUI.addEventListener("click", setQuestionClicked);
                let th = document.createElement("th");
                th.setAttribute("scope", "row");

                th.innerHTML = "<td>" + value.Quiz_Name + "</td>";
                let td1 = document.createElement("td");
                td1.append(editIconUI);
                let td2 = document.createElement("td");
                td2.append(deleteIconUI);
                let td3 = document.createElement("td");
                td3.append(setQueUI);
                $li.append(th);

                $li.append(td1);
                $li.append(td2);
                $li.append(td3);
                userListUI.append($li);
            });
        });
}



// --------------------------
// ADD
// --------------------------

const addUserBtnUI = document.getElementById("set_quiz_btn");
addUserBtnUI.addEventListener("click", addUserBtnClicked);

function addUserBtnClicked() {

    const usersRef = dbRef.child("Quiz");
    const addUserInputsUI = document.getElementsByClassName("user-input");

    // this object will hold the new user information
    let newUser = {};

    // loop through View to get the data for the model
    for (let i = 0, len = addUserInputsUI.length; i < len; i++) {
        let key = addUserInputsUI[i].getAttribute("data-key");
        let value = addUserInputsUI[i].value;
        newUser[key] = value;
    }

    usersRef.push(newUser);

    document.getElementById("new").style.display = "none";
}

// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {
    e.stopPropagation();
    var userID = e.target.getAttribute("userid");
    const usersRef = dbRef.child("Quiz/" + userID);
    usersRef.remove();

}

// --------------------------
// SET QUESTION
// --------------------------
function setQuestionClicked(e) {
    e.stopPropagation();

    var userID = e.target.getAttribute("userid");

    window.location.replace("setquiz.html?" + userID);


}

// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {
    document.getElementById("edit-quiz-module").style.display = "block";

    //set user id to the hidden input field
    document.querySelector(".edit-userid").value =
        e.target.getAttribute("userid");

    const userRef = dbRef.child("Quiz/" + e.target.getAttribute("userid"));

    // set data to the user field
    const editUserInputsUI = document.querySelectorAll(".edit-user-input");

    userRef.on("value", (snap) => {
        for (var i = 0, len = editUserInputsUI.length; i < len; i++) {
            var key = editUserInputsUI[i].getAttribute("data-key");
            editUserInputsUI[i].value = snap.val()[key];
        }
    });

    const saveBtn = document.querySelector("#edit-user-btn");
    saveBtn.addEventListener("click", saveUserBtnClicked);
}

function saveUserBtnClicked(e) {
    const userID = document.querySelector(".edit-userid").value;
    const userRef = dbRef.child("Quiz/" + userID);

    var editedUserObject = {};

    const editUserInputsUI = document.querySelectorAll(".edit-user-input");

    editUserInputsUI.forEach(function(textField) {
        let key = textField.getAttribute("data-key");
        let value = textField.value;
        editedUserObject[textField.getAttribute("data-key")] = textField.value;
    });

    userRef.update(editedUserObject);

    document.getElementById("edit-quiz-module").style.display = "none";
}

$("#set_quiz").click(function() {
    $("#new").css("display", "block");
});
$("#close").click(function() {
    $("#new").css("display", "none");
});
$("#cl").click(function() {
    $("#user-detail").css("display", "none");
    $("#cl").css("display", "none");
});