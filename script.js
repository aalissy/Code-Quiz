 /* list of variables from the html document */
var timerEl = document.getElementById('timer');
var quizInfo = document.getElementById('quizInfo'); 
var start = document.getElementById('start');
var finishedQuizEl = document.getElementById('finishedQuiz');
var finalScoreEl = document.getElementById('finalScore');
var initial = document.getElementById('initial');
var highScoresEl = document.getElementById('highScores');
var scores = document.getElementById('scores');
var submit = document.getElementById('submit');
var back = document.getElementById('back');
var clear = document.getElementById('clear');
var myQuestion = document.getElementById('question');
var ans = document.getElementById('answer');
var correct = document.getElementById('correct');
var wrong = document.getElementById('wrong');
var bar = document.getElementById('bar');
/* variable for new question */
var newQuestion;
/* seconds left for the timer */
var secondsLeft = 75;
/* variable for timer interval */
var timerInterval;

/* questions array listing the question, options, and answer */
var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        options: [
            "1. strings",
            "2. booleans",
            "3. alerts",
            "4. numbers"
        ],
        answer: "3. alerts"
    },
    {
        question: "The condition in an if/else statement is enclosed with ______.",
        options: [
            "1. quotes",
            "2. curly brackets",
            "3. parenthesis",
            "4. square brackets"
        ],
        answer: "3. parenthesis"
    },
    {
        question: "Arrays in JavaScript can be used to store ______.",
        options: [
            "1. numbers and strings",
            "2. other arrays",
            "3. booleans",
            "4. all of the above"
        ],
        answer: "4. all of the above"
    },
    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        options: [
            "1. commas",
            "2. curly brackets",
            "3. quotes",
            "4. parenthesis"
        ],
        answer: "3. quotes"
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        options: [
            "1. Javascript",
            "2. terminal/bash",
            "3. for loops",
            "4. console.log"
        ],
        answer: "4. console.log"
    }
];

/* set Timer function */
function setTimer() {
    timerInterval = setInterval(function() {
        /* seconds decrease as time goes on */
        secondsLeft--;
        /* timer displays the time and the seconds left */
        timerEl.textContent = "Time: " + secondsLeft;
        /* if there are no seconds left the timer gets cleared and the finalHighScore() function is displayed */
        if (secondsLeft === 0) {
            clearInterval(timerInterval);
            finalHighScore();
        }
    }, 1000);
}

/* when clicking the start button the onStart() function begins */
start.addEventListener("click", onStart);

/* onStart() function */
function onStart() {
    /* questions and answers from the array are displayed */
    myQuestion.classList.remove("hidden");
    ans.classList.remove("hidden");
    /* start button and info about the quiz are hidden */
    start.classList.add("hidden");
    quizInfo.classList.add("hidden");
    /* sets the first question as zero */
    newQuestion = 0;
    /* setTimer() function begins starting the timer */
    setTimer();
    /* getNewQuestion() function begins */
    getNewQuestion();
}

/* newQuestions() function with codeQuiz as a parameter */
function newQuestions(codeQuiz) {
    /* inner text of the question div is set to the question in the questions array */
    myQuestion.innerText = codeQuiz.question;
    /* for loop for how many options the questions array contains */
    for(var i = 0; i < codeQuiz.options.length; i++) {
        /* creates an optionsBttn */
        var optionsBttn = document.createElement("button");
        /* adds the text from the options in the questions array */
        optionsBttn.innerText = codeQuiz.options[i];
        /* gives the optionsBttn the class list of button */
        optionsBttn.classList.add("button");
        /* when clicking the options button it leads to the function my choice */
        optionsBttn.addEventListener('click', myChoice);
        /* adds the optionsBttn to the answer div */
        ans.appendChild(optionsBttn);
    }
}

/* getNewQuestion() function */
function getNewQuestion() {
    /* gets the next question after the first one is answered */
    newQuestions(questions[newQuestion]);
    newQuestion++;
}

/* myChoice() function with an event parameter */
function myChoice(event) {
    /* prevents any default events from occuring */
    event.preventDefault();
    /* selection variable that returns the triggered element event */ 
    var selection = event.target;
    /* correct is hidden */
    correct.classList.add("hidden");
    /* wrong is hidden */
    wrong.classList.add("hidden");
    /* if statement determining if the selection text content is the same as the previous questions answer */
    if (selection.textContent === questions[newQuestion-1].answer) {
        /* displays the bar */
        bar.classList.remove("hidden");
        /* displays correct */
        correct.classList.remove("hidden");
        /* while statement removing the answers from the first question */
        while (ans.firstChild) {
            ans.removeChild(ans.firstChild);
        }
        /* else if statement determining if the selection text content is not the same as the previous questions answer */
    } else if (selection.textContent !== questions[newQuestion-1].answer) {
        /* removes ten seconds from the countdown */
        secondsLeft = secondsLeft - 10;
        /* displays the bar */
        bar.classList.remove("hidden");
        /* displays wrong */
        wrong.classList.remove("hidden");
        /* while statement removing the answers from the first question */
        while (ans.firstChild) {
            ans.removeChild(ans.firstChild);
        }
    }
    /* if the length of the questions array is greater then the newQuestion variable then the getNewQuestion() function starts */
    if (questions.length > newQuestion) {
        getNewQuestion();
    /* else the finalHighScore() function begins and the timerInterval is stopped */
    } else {
        finalHighScore();
        clearInterval(timerInterval);
    }
}

/* finalHighScore() function */
function finalHighScore() {
    /* questions are hidden */
    myQuestion.classList.add("hidden");
    /* options are hidden */
    ans.classList.add("hidden");
    /* start button is hidden */
    start.classList.add("hidden");
    /* info about the quiz is hidden */
    quizInfo.classList.add("hidden");
    /* the finished quiz info is displayed */
    finishedQuizEl.classList.remove("hidden");
    /* adds text content to the paragraph class finalScore displaying it as the seconds left on the timer */
    document.querySelector(".finalScore").textContent = "Your final score is " + secondsLeft;
    /* updates countdown */
    timerEl.textContent = "Time: " + secondsLeft;
}

/* clearEl() function works when the input bar is clicked */
function clearEl() {
    /* bar is hidden */
    bar.classList.add("hidden");
    /* wrong is hidden */
    wrong.classList.add("hidden");
    /* correct is hidden */
    correct.classList.add("hidden");
}

/* adds a click function to the submit button */
submit.addEventListener("click", function (event) {
    /* prevents any default events from occuring */
    event.preventDefault();
    /* the high scores div is displayed */
    highScoresEl.classList.remove("hidden");
    /* the finished quiz info is hidden */
    finishedQuizEl.classList.add("hidden");
    /* defines a variable input with the value inputed in for initials and the secondsLeft variable for the highScore */
    var input = {
        initials: initial.value,
        highScore: secondsLeft
    };
    /* defines a variable highScoresList and creates an ordered list element */
    var highScoresList = document.createElement("li");
    /* adds the input initials a hyphen and the input highScore to the highScoresList variable */
    highScoresList.innerText = input.initials + " - " + input.highScore;
    /* adds the highScoresList to the scores ordered list */
    scores.appendChild(highScoresList);
})

/* adds a click function to the back button */
back.addEventListener("click", function(){
    /* displays the start button */ 
    start.classList.remove("hidden");
    /* displays the quiz information */
    quizInfo.classList.remove("hidden");
    /* hides the high scores div */
    highScoresEl.classList.add("hidden");
    /* clears the interval timer */
    clearInterval(timerInterval);
    /* puts the secondsLeft variable back to 75 */
    secondsLeft = 75;
    /* puts the timerEl text content to the time and the seconds left */
    timerEl.textContent = "Time: " + secondsLeft;
    /* sets the form as blank */
    document.getElementById('initial').value='';
}) 

/* adds a click function to the clear button */
clear.addEventListener("click", function() {
    /* while loop that determines if there are more then zero scores */
    while(scores.childElementCount > 0) {
        /* removes the scores if there are more than zero */
        scores.removeChild(scores.lastChild);
    }
})

/* function viewScores() from the html view high scores */
function viewScores() {
    /* hides everything but the high score list */
    highScoresEl.classList.remove("hidden");
    start.classList.add("hidden");
    quizInfo.classList.add("hidden");
    finishedQuizEl.classList.add("hidden");
    myQuestion.classList.add("hidden");
    ans.classList.add("hidden");
}