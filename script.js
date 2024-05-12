const questions = [
    {
        questions: "Hasan akem chandum sol?",
        answer: [
            {Text: "2005", corrrect: true},
            {Text: "2003", corrrect: false},
            {Text: "2007", corrrect: false},
            {Text: "2001", corrrect: false},
        ]
    },
    {
        questions: "Ki shab reject kad?",
        answer: [
            {Text: "Hasan aka", corrrect: false},
            {Text: "Amirjon", corrrect: false},
            {Text: "Nurmuhammad aka", corrrect: false},
            {Text: "Alisher", corrrect: true},
        ]
    },
    {
        questions: "Which is smallest continent in the world?",
        answer: [
            {Text: "Asia", corrrect: false},
            {Text: "Arctic", corrrect: true},
            {Text: "Africa", corrrect: false},
            {Text: "Australia", corrrect: false},
        ]
    },
    {
        questions: "Which is smallest country in the world?",
        answer: [
            {Text: "Japan", corrrect: false},
            {Text: "Italy", corrrect: false},
            {Text: "Spain", corrrect: false},
            {Text: "Vatican", corrrect: true},
        ]
    }
];

const questionsElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionsElement.innerHTML = questionNo + ". " + currentQuestion.
    questions;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.Text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.corrrect){
            button.dataset.corrrect = answer.corrrect;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.corrrect === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.correctList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block"
}

function showScore(){
    resetState();
    questionsElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();