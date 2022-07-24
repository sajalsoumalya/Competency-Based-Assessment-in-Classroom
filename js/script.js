var url = window.location.href;
var quizid = url.substring(url.lastIndexOf('?') + 1);

// Firebase Database Reference and the child
const dbRef = firebase.database().ref();
const usersRef = dbRef.child("Quiz/" + quizid + "/Questions");
const updateRef = dbRef.child("Quiz/" + quizid + "/Result");

let questions = [];
let timeValue;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;
let gtime;
let result;
let summ=[];

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
    alert("Your Quetsions hass been loaded Now you can START your Quiz");
});
dbRef.child("Quiz/" + quizid).on("value", (snap) => {
    timeValue = snap.val().time_per_que;
})


const startBtn = document.querySelector(".startBtn button");
const des_box = document.querySelector(".des_box");
const exit_btn = des_box.querySelector(".btngulo .quitBtn");
const continue_btn = des_box.querySelector(".btngulo .restart");
const quizBox = document.querySelector(".quizBox");
const feedback_input = document.querySelector(".feedback_input");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");




const restart_quiz = result_box.querySelector(".btngulo .restart");
const quitBtn_quiz = result_box.querySelector(".btngulo .quitBtn");

var feedback = '';
feedback += '<div class="des" style="padding: 5px 0px; color:brown;" id="dropdown">Select Your Level of Competency ';
feedback += '<i class="fa fa-des-circle" aria-hidden="true" title="Choose the Competency level accordingly &#013;UNCONSCIOUS INCOMPETENCE: I don\'t know that I don\'t know, Need feedback &#013;CONSCIOUS INCOMPETENCE: I am unskilled. Need guidance &#013;CONSCIOUS COMPETENCE: I am skilled. Need practice &#013; UNCONSCIOUS COMPETENCE:I am fully confident. Need new challenges"></i></div>'
feedback += '<select name="Stage" id="Stage" autofocus required>';
feedback += '<option value="" selected disabled>Choose.....</option>';
feedback += '<option value="UNCONSCIOUS INCOMPETENCE" >I don\'t know that I don\'t know, Need feedback</option>';
feedback += '<option value="CONSCIOUS INCOMPETENCE">I am unskilled. Need guidance</option>';
feedback += '<option value="CONSCIOUS COMPETENCE">I am skilled. Need practice</option>';
feedback += '<option value="UNCONSCIOUS COMPETENCE">I am fully confident. Need new challenges</option>';
feedback += '</select>';

startBtn.onclick = () => {
    document.getElementById("time_per_que").innerHTML = timeValue;
    des_box.classList.add("activeInfo"); //show des box
    startBtn.classList.add("disabled");
    startBtn.classList.remove("enabled");

}

exit_btn.onclick = () => {
    des_box.classList.remove("activeInfo"); //hide des box
    startBtn.classList.remove("disabled");
    startBtn.classList.add("enabled");
}


continue_btn.onclick = () => {
    des_box.classList.remove("activeInfo");
    quizBox.classList.add("activeQuiz");
    showQuetions(0);
    queCounter(que_numb);
    startTimer(timeValue);
}



quitBtn_quiz.onclick = () => {
    window.location.reload();
}

const next_btn = document.querySelector("footer .next_btn");
const show_btn = document.querySelector("footer .show_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");


next_btn.onclick = () => {
    let x = document.getElementById("Stage").value;
    if (x == "") {
        alert("you must need to fill this form")
        return false;
    } else {
        summ.push(result);
        console.log(summ);
        updateRef.push(result);
        feedback_input.innerHTML = ' ';
        if (que_count < questions.length - 1) {
            que_count++;
            que_numb++;
            showQuetions(que_count);
            queCounter(que_numb);
            clearInterval(counter);
            clearInterval(counterLine);
            startTimer(timeValue);
            timeText.textContent = "Time Left";
            next_btn.classList.remove("show");
        } else {
            clearInterval(counter);
            clearInterval(counterLine);
            showResult();
        }
    }
}

function showQuetions(index) {
    const que_text = document.querySelector(".que_text");


    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag = '';
    for (var i = 0; i < questions[index].options.length; i++) {
        option_tag += '<div class="option"><span>' + questions[index].options[i] + '</span></div>'
    }
    que_text.innerHTML = que_tag;
    option_list.innerHTML = option_tag;

    const option = option_list.querySelectorAll(".option");

    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';


function optionSelected(answer) {
    clearInterval(counter);
    clearInterval(counterLine);
    let userAns = answer.textContent;
    answer.classList.add("selected");
    let correcAns = questions[que_count].answer;
    const allOptions = option_list.children.length;
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled");
    }
    feedback_input.innerHTML = feedback;
    show_btn.classList.add("show")
    show_btn.onclick = () => {
        let x = document.getElementById("Stage").value;
        if (x == "") {
            alert("you must need to choose from the DropDown")
            return false;
        } else {
            if(x=="UNCONSCIOUS COMPETENCE"){
                if (userAns == correcAns) {
                    userScore += 1;
                    answer.classList.add("correct");
                    answer.insertAdjacentHTML("beforeend", tickIconTag);
    
                    result = {
                        question: que_count,
                        userAns: userAns,
                        correcAns: correcAns,
                        stage:x
                    };
                } else {
                    answer.classList.add("incorrect");
                    answer.insertAdjacentHTML("beforeend", crossIconTag);
    
                    for (i = 0; i < allOptions; i++) {
                        if (option_list.children[i].textContent == correcAns) {
                            option_list.children[i].setAttribute("class", "option correct");
                            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                        }
                    }
                    result = {
                        question: que_count,
                        userAns: userAns,
                        correcAns: correcAns,
                        stage:"CONFIDENT BUT WRONG"
                    };
                }
            }else if(x=="UNCONSCIOUS INCOMPETENCE"){
                if (userAns == correcAns) {
                    answer.classList.add("correct");
                    answer.insertAdjacentHTML("beforeend", tickIconTag);
                    result = {
                        question: que_count,
                        userAns: userAns,
                        correcAns: correcAns,
                        stage:"UNCONFIDENT BUT CORRECT"
                    };
                } else {
                    answer.classList.add("incorrect");
                    answer.insertAdjacentHTML("beforeend", crossIconTag);
    
                    for (i = 0; i < allOptions; i++) {
                        if (option_list.children[i].textContent == correcAns) {
                            option_list.children[i].setAttribute("class", "option correct");
                            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                        }
                    }
                    result = {
                        question: que_count,
                        userAns: userAns,
                        correcAns: correcAns,
                        stage:x,
                    };
                }
            }else{
                if (userAns == correcAns) {
                    userScore += 1;
                    answer.classList.add("correct");
                    answer.insertAdjacentHTML("beforeend", tickIconTag);
    
                    result = {
                        question: que_count,
                        userAns: userAns,
                        correcAns: correcAns,
                        stage:x
                    };
                } else {
                    answer.classList.add("incorrect");
                    answer.insertAdjacentHTML("beforeend", crossIconTag);
    
                    for (i = 0; i < allOptions; i++) {
                        if (option_list.children[i].textContent == correcAns) {
                            option_list.children[i].setAttribute("class", "option correct");
                            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                        }
                    }
                    result = {
                        question: que_count,
                        userAns: userAns,
                        correcAns: correcAns,
                        stage:x
                    };
                }
            }

            document.getElementById("dropdown").style.display = "none";
            document.getElementById("Stage").style.display = "none";
            show_btn.classList.remove("show");
            next_btn.classList.add("show");
        }
    }
}

function showResult() {
    des_box.classList.remove("activeInfo");
    quizBox.classList.remove("activeQuiz");
    result_box.classList.add("activeResult");
    const scoreText = result_box.querySelector(".score_text");
    const summary = result_box.querySelector(".summ");
    if (userScore > 3) {

        let scoreTag = '<span>and congrats! 🎉, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else if (userScore > 1) {
        let scoreTag = '<span>and nice 😎, You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    } else {
        let scoreTag = '<span>and sorry 😐, You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    let raw = '';
    for(var i= 0; i<summ.length; i++){     
        let row
        if(summ[i].correcAns == summ[i].userAns && summ[i].stage !="CONFIDENT BUT WRONG" && summ[i].stage !="UNCONFIDENT BUT CORRECT"){ 
            let tr =document.createElement('tr');
            tr.style.backgroundColor = "#d4edda";
            tr.innerHTML= '<td >'+summ[i].question+'</td><td>'+summ[i].stage+'</td>';
            summary.append(tr);
        }else{
            let tr =document.createElement('tr');
            tr.style.backgroundColor = "#f8d7da";
            tr.innerHTML= '<td>'+summ[i].question+'</td><td>'+summ[i].stage+'</td>';
            summary.append(tr);
        }          
    }


}

function startTimer(time) {
    counter = setInterval(timer, 1000);

    function timer() {

        timeCount.textContent = time + " sec";
        gtime = time;
        time--;
        if (time < 9) {
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero;
        }
        if (time < 0) {
            feedback_input.innerHTML = feedback;
            show_btn.classList.add("show")
            clearInterval(counter);
            timeText.textContent = "Time Off";
            const allOptions = option_list.children.length;
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled");
            }
            show_btn.onclick = () => {
                let x = document.getElementById("Stage").value;
                if (x == "") {
                    alert("you must need to choose from the DropDown")
                    return false;
                } else {

                    let correcAns = questions[que_count].answer;
                    for (i = 0; i < allOptions; i++) {
                        if (option_list.children[i].textContent == correcAns) {
                            option_list.children[i].setAttribute("class", "option correct");
                            option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag);
                            console.log("Time Off: Auto selected correct answer.");
                        }
                    }
                    result = {
                        question: que_count,
                        userAns: "Not Answered",
                        correcAns: correcAns,
                    };
                    show_btn.classList.remove("show")
                    next_btn.classList.add("show");
                }
            }
        }
    }
}



function queCounter(index) {

    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;
}