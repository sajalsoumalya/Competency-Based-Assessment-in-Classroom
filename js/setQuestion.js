document.getElementById("welcome").innerHTML = "Welcome " + sessionStorage.getItem("email");

// !IMPORTANT: REPLACE WITH YOUR OWN CONFIG OBJECT BELOW

// Initialize Firebase
var url = window.location.href;
var quizid = url.substring(url.lastIndexOf('?') + 1);


// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child("Quiz/" + quizid + "/Questions");

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
let queCount = 0;

$("#today").val(today);
$("#author").val(author);
let question = [];

readUserData();

// --------------------------
// READ
// --------------------------
function readUserData() {
    const userListUI = document.getElementById("user-list");

    usersRef.on("value", (snap) => {
        queCount = Object.keys(snap.val()).length;

        userListUI.innerHTML = "";
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
            question.push(que);

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
            deleteIconUI.classList.add("fa-minus-circle");
            deleteIconUI.setAttribute("userid", key);
            deleteIconUI.addEventListener("click", deleteButtonClicked);
            let th = document.createElement("th");
            th.setAttribute("scope", "row");
            th.innerHTML = "<td>" + value.Question + "</td>";
            let td1 = document.createElement("td");
            td1.append(editIconUI);
            let td2 = document.createElement("td");
            td2.append(deleteIconUI);
            $li.append(th);
            $li.append(td1);
            $li.append(td2);
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
    ///console.log(myPro);
}

// --------------------------
// DELETE
// --------------------------
function deleteButtonClicked(e) {
    e.stopPropagation();
    var userID = e.target.getAttribute("userid");
    let me = usersRef.child(userID);
    me.remove();
}


// --------------------------
// EDIT
// --------------------------
function editButtonClicked(e) {
    document.getElementById("edit-question-module").style.display = "block";

    //set user id to the hidden input field
    document.querySelector(".edit-userid").value =
        e.target.getAttribute("userid");

    const userRef = dbRef.child("Quiz/" + quizid + "/Questions/" + e.target.getAttribute("userid"));

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

    document.getElementById("edit-question-module").style.display = "none";
}

$("#set_quiz").click(function() {
    $("#new").css("display", "block");
});
$("#closelink").click(function() {
    $("#link").css("display", "none");
});
$("#cl").click(function() {
    $("#new").css("display", "none");
});

var room = 1;

function education_fields() {

    room++;
    var objTo = document.getElementById('add')
    var divtest = document.createElement("div");
    divtest.setAttribute("class", "form-group removeclass" + room);
    var rdiv = 'removeclass' + room;
    divtest.innerHTML = '<div style="display: flex; justify-content: space-between; \"><input type=\'text\' data-key=\'Subject\' id="Subject" class=\'user-input form-control\'><span class=\"remove\" onclick= remove_education_fields(' + room + ') ><i class=\"fas fa-minus\"></i></span></div><br>';

    objTo.appendChild(divtest)
}

function remove_education_fields(rid) {
    $('.removeclass' + rid).remove();
}


function getlink() {
    let getlink = document.getElementById("getlink")
    let link = document.getElementById("link")
    link.style.display = "block";
    quizlink = "https://assessmentofcompetence.web.app/quiz.html?" + quizid;
    getlink.value = quizlink;
}


const resultRef = dbRef.child("Quiz/" + quizid + "/Result");

let TOTAL;
let UNCONSCIOUS_INCOMPETENCE;
let CONSCIOUS_INCOMPETENCE;
let CONSCIOUS_COMPETENCE;
let UNCONSCIOUS_COMPETENCE;



resultRef.on("value", (snap) => {
    let list = snap.val();
    TOTAL = Object.keys(list).length;
});

resultRef.orderByChild('stage').equalTo("UNCONSCIOUS INCOMPETENCE").on("value", (snap) => {
    let list = snap.val();
    UNCONSCIOUS_INCOMPETENCE = Object.keys(list).length;
});
resultRef.orderByChild('stage').equalTo("CONSCIOUS INCOMPETENCE").on("value", (snap) => {
    let list = snap.val();
    CONSCIOUS_INCOMPETENCE = Object.keys(list).length;
});
resultRef.orderByChild('stage').equalTo("CONSCIOUS COMPETENCE").on("value", (snap) => {
    let list = snap.val();
    CONSCIOUS_COMPETENCE = Object.keys(list).length;
});
resultRef.orderByChild('stage').equalTo("UNCONSCIOUS COMPETENCE").on("value", (snap) => {
    let list = snap.val();
    UNCONSCIOUS_COMPETENCE = Object.keys(list).length;
});
setTimeout(function() {
    var baroptions = {
        chart: {
            type: 'bar'
        },
        series: [{
            name: 'stages',
            data: [UNCONSCIOUS_INCOMPETENCE, CONSCIOUS_INCOMPETENCE, CONSCIOUS_COMPETENCE, UNCONSCIOUS_COMPETENCE]
        }],
        fill: {
            colors: "white",
        },
        xaxis: {
            categories: ['UNCONSCIOUS INCOMPETENCE', 'CONSCIOUS INCOMPETENCE', 'CONSCIOUS COMPETENCE', 'UNCONSCIOUS COMPETENCE'],
            labels: {
                style: {
                    colors: "white",
                    fontSize: "0.7rem",
                },
            },
        },
        yaxis: {
            labels: {
                style: {
                    colors: "white",
                    fontSize: "0.7rem",
                },
            },
        },
        dataLabels: {
            enabled: false,
        },
    }

    var barchart = new ApexCharts(document.querySelector("#barchart"), baroptions);
    barchart.render();
    var pieoptions = {
        chart: {
            type: 'pie'
        },
        series: [UNCONSCIOUS_INCOMPETENCE, CONSCIOUS_INCOMPETENCE, CONSCIOUS_COMPETENCE, UNCONSCIOUS_COMPETENCE],
        labels: ['UNCONSCIOUS INCOMPETENCE', 'CONSCIOUS INCOMPETENCE', 'CONSCIOUS COMPETENCE', 'UNCONSCIOUS COMPETENCE'],

    }
    var piechart = new ApexCharts(document.querySelector("#piechart"), pieoptions);
    piechart.render();


    let result_matrix = [];
    for (var i = 0; i < queCount; i++) {
        result_matrix[i] = new Array(4); // make each element an array
    }
    for (var i = 0; i < queCount; i++) {
        for (var j = 0; j < 4; j++) {
            result_matrix[i][j] = 0;
        }
    }
    resultRef.on("value", (snap) => {
        snap.forEach((childSnap) => {
            value = childSnap.val();
            if (value.stage == "UNCONSCIOUS INCOMPETENCE") {
                result_matrix[value.question][0]++;
            } else if (value.stage == "CONSCIOUS INCOMPETENCE") {
                result_matrix[value.question][1]++;
            } else if (value.stage == "CONSCIOUS COMPETENCE") {
                result_matrix[value.question][2]++;
            } else if (value.stage == "UNCONSCIOUS COMPETENCE") {
                result_matrix[value.question][3]++;
            } else {

            }
        });
    });
    let resultMatrixUI = document.getElementById("result_matrix");
    for (var i = 0; i < queCount; i++) {
        let li = document.createElement("tr");
        let td1 = document.createElement("td");
        td1.innerHTML = result_matrix[i][0];
        let td2 = document.createElement("td");
        td2.innerHTML = result_matrix[i][1];
        let td3 = document.createElement("td");
        td3.innerHTML = result_matrix[i][2];
        let td4 = document.createElement("td");
        td4.innerHTML = result_matrix[i][3];
        let th = document.createElement("th");
        th.setAttribute("scope", "row");
        th.innerHTML = "Q" + (i + 1);
        li.append(th);
        li.append(td1);
        li.append(td2);
        li.append(td3);
        li.append(td4);
        resultMatrixUI.append(li);
    }
}, 3000);