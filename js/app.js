const questionNumber = document.querySelector('.question-number')
const questionText = document.querySelector('.question-text')
const optionContainer = document.querySelector('.option-container')
const answerIndicatorContainer = document.querySelector('.answer-indicator')

let questionCounter = 0;
let currenteQuestion;
let availebleQuestions = [];
let availebleOptions = [];

function setAvailebleQuestions() {
    const totalQustions = quiz.length;
    for(let i = 0; i < totalQustions; i++) {
        availebleQuestions.push(quiz[i])
    }

}

function getNewQuestion() {
    questionNumber.innerHTML = 'Question ' + (questionCounter + 1) + ' de ' + quiz.length;

    const questionIndex = availebleQuestions[Math.floor(Math.random() * availebleQuestions.length)]
    currenteQuestion = questionIndex;
    questionText.innerHTML = currenteQuestion.q;

    const index1 = availebleQuestions.indexOf(questionIndex);
    availebleQuestions.splice(index1, 1);

    const optionLen = currenteQuestion.options.length;
    for(let i = 0; i < optionLen; i ++) {
        availebleOptions.push(i)
    }

    optionContainer.innerHTML = '';
    let animationDelay = 0.15;

    for(let i = 0; i < optionLen; i++) {
        const optionIndex = availebleOptions[Math.floor(Math.random() * availebleOptions.length)];
        const index2 = availebleOptions.indexOf(optionIndex);
        availebleOptions.splice(index2, 1)
        const option = document.createElement('div');
        option.innerHTML = currenteQuestion.options[i];
        option.id = i;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++

}

function getResult(element) {
    const id = parseInt(element.id);
    if(id === currenteQuestion.answer) {
        element.classList.add("correct")
        updateAnswerIndicator('correct');
    }else {
        element.classList.add("wrong")
        updateAnswerIndicator('wrong');

        const optionLen = optionContainer.children.length;
        for(let i = 0; i < optionLen; i++) {
            if(parseInt(optionContainer.children[i].id) === currenteQuestion.answer) {
                optionContainer.children[i].classList.add("correct");
            }
        }
    }

    unclickableOptions();
}

function unclickableOptions() {
    const optionLen = optionContainer.children.length;
    for(let i = 0; i < optionLen; i++) {
        optionContainer.children[i].classList.add("alread-answered")
    }
}

function answerIndicator() {
    const totalQustions = quiz.length;
    for(let i = 0; i < totalQustions; i++) {
        const indicator = document.createElement("div");
        answerIndicatorContainer.appendChild(indicator);
    }
}

function next(){
    if(questionCounter === quiz.length) {
        console.log('quiz over')
    }else {
        getNewQuestion();
    }
}

window.onload = function() {

    setAvailebleQuestions();
    getNewQuestion();
    answerIndicator();
}