// creating an array and passing the number, questions, options, and answers
let questions = [{
        numb: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Preprocessor",
            "Hyper Text Markup Language",
            "Hyper Text Multiple Language",
            "Hyper Tool Multi Language"
        ]
    },
    {
        numb: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Common Style Sheet",
            "Colorful Style Sheet",
            "Computer Style Sheet",
            "Cascading Style Sheet"
        ]
    },
    {
        numb: 3,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        options: [
            "Hypertext Preprocessor",
            "Hypertext Programming",
            "Hypertext Preprogramming",
            "Hometext Preprocessor"
        ]
    },
    {
        numb: 4,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
            "Stylish Question Language",
            "Stylesheet Query Language",
            "Statement Question Language",
            "Structured Query Language"
        ]
    },
    {
        numb: 5,
        question: "What does XML stand for?",
        answer: "eXtensible Markup Language",
        options: [
            "eXtensible Markup Language",
            "eXecutable Multiple Language",
            "eXTra Multi-Program Language",
            "eXamine Multiple Language"
        ]
    },
    {
        numb: 6,
        question: "Computer Moniter is also known as:",
        answer: "VDU",
        options: [
            "VDU",
            "DVU",
            "UVD",
            "CCTV"
        ]
    },
    {
        numb: 7,
        question: "Which one of these stores more data than a DVD ?",
        answer: "Blue Ray Disk",
        options: [
            "CD Rom",
            "Floppy",
            "Blue Ray Disk",
            "Red Ray Disk"
        ]
    },
    {
        numb: 8,
        question: "Which one is the result of the output given by a computer ?",
        answer: "Information",
        options: [
            "Istruction",
            "Data",
            "Excursion",
            "Information"
        ]
    },
    {
        numb: 9,
        question: "Which one of these also known as read/write memory ?",
        answer: "RAM",
        options: [
            "RAM",
            "Hard Disk",
            "DVD",
            "ROM"
        ]
    },
    {
        numb: 10,
        question: "Which among following first generation of computers had ?",
        answer: "Vaccum Tubes and Magnetic Drum",
        options: [
            "Magnetic Tape and Transistors",
            "Integrated Circuits",
            "Vaccum Tubes and Magnetic Drum",
            "All of above"
        ]
    },
];


usersRef.on("value", (snap) => {


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
        console.log(question);
    });
});