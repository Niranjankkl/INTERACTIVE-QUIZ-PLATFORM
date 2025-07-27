const questions = [
            {
                question: "What is the capital of Kerala?",
                options: ["Thiruvananthapuram", "Kochi", "Malappuram", "Thrissur"],
                answer: "Thiruvananthapuram"
            },
            {
                question: "Which planet is known as the Red Planet?",
                options: ["Earth", "Mars", "Jupiter", "Venus"],
                answer: "Mars"
            },
            {
                question: "What is the largest ocean on Earth?",
                options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
                answer: "Pacific Ocean"
            },
            {
                question: "What is the chemical symbol for carbon dioxide?",
                options: ["O2", "H2O", "CO2", "N2"],
                answer: "CO2"
            },
            {
                question: "Who made Taj Mahal?",
                options: ["Tippu Sultan", "Mughal Emperor", "Shah Jahan", "Akbar"],
                answer: "Shah Jahan"
            },
            {
                question: "What is the capital of India?",
                options: ["Mumbai", "New Delhi", "Bangalore", "Hyderabad"],
                answer: "New Delhi"
            },
            {
                question: "What is the largest continent on Earth?",
                options: ["Africa", "Asia", "Europe", "North America"],
                answer: "Asia"
            },
            {
                question: "What is the boiling point of water?",
                options: ["0°C", "50°C", "100°C", "150°C"],
                answer: "100°C"
            },
            {
                question: "Who wrote 'Romeo and Juliet'?",
                options: ["Charles Dickens", "Mark Twain", "William Shakespeare", "Jane Austen"],
                answer: "William Shakespeare"
            },
            {
                question: "What is the currency of Japan?",
                options: ["Yen", "Won", "Dollar", "Euro"],
                answer: "Yen"
            }
];

const startScreen = document.querySelector('#start-screen');
const quizScreen = document.querySelector('#quiz-screen');
const resultScreen = document.querySelector('#results-screen'); // three screens


const startButton = document.querySelector('#start-quiz-btn');
const questionText = document.querySelector('#question-text');
const optionsContainer = document.querySelector('#options-container');
const nextQuestionBtn = document.querySelector('#next-question-btn');
const timerElement = document.querySelector('#time-left');
const scoreElement = document.querySelector('#score-display');
const progressBarFill = document.querySelector('#progress-bar-fill');
const finalScoreElement = document.querySelector('#final-score');
const totalQuestionsElement = document.querySelector('#total-questions');
const highScoreElement = document.querySelector('#high-score');
const resetButton = document.querySelector('#restart-quiz-btn');
//variable assighnments
let shuffledQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timerInterval;
let selectedOption = null;
let highScore = 0; 

const initQuiz = () => {
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
    console.log("Quiz initialized");
}

window.onload = initQuiz;

const startQuiz = () => {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30; // reset timer
    scoreElement.textContent = score;
    nextQuestionBtn.classList.add('hidden');
    startTimer();
    showQuestion();
    updateProgressBar();
    console.log("Quiz started");
}
startButton.addEventListener('click', startQuiz);
const showQuestion = () => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    selectedOption = null;
    optionsContainer.innerHTML = '';
    nextQuestionBtn.classList.add('hidden');
    if (currentQuestionIndex >= shuffledQuestions.length) {
        endQuiz();
        console.log("showQuestion: No more questions left.");
        return;
    }
    currentQuestion.options.forEach(option => {
    const button = document.createElement('button');
    button.textContent = option;
    button.classList.add('option-button');
    button.addEventListener('click', () => {
        selectAnswer(button, option, currentQuestion.answer);
        clearInterval(timerInterval);
    });
    optionsContainer.appendChild(button);
    });
}

const selectAnswer = (button, selectedoptn, correctAnswer) => {
    console.log("Selected option:", selectedoptn);
    Array.from(optionsContainer.children).forEach(button => {
        button.classList.add('pointer-events-none'); // Disable clicks
    });
    button.classList.add('selected');
    selectedOption = button.textContent;
    if (selectedOption === correctAnswer) {
        button.classList.add('correct');
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        button.classList.add('incorrect');
        Array.from(optionsContainer.children).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }
    nextQuestionBtn.classList.remove('hidden');
}

const startTimer = () => {
    timeLeft = 30;
    clearInterval(timerInterval);
    timerInterval = setInterval( () => {
        timeLeft--;
        timerElement.innerText =  timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.querySelector(".result-title").textContent = "";
            document.querySelector(".result-title").textContent = "Quiz Completed! Time's up!";
            endQuiz();
            console.log("Time's up!");
        }

    }, 1000);
}

const updateProgressBar = () => {
    const progress = (currentQuestionIndex + 1) / shuffledQuestions.length * 100;
    progressBarFill.style.width = `${progress}%`;
}

const nextQuestion = () => {
    currentQuestionIndex++;
    if(currentQuestionIndex <= shuffledQuestions.length) {
        showQuestion();
        updateProgressBar();
        startTimer();
        Array.from(optionsContainer.children).forEach(button => {
            button.classList.remove('pointer-events-none', 'selected', 'correct', 'incorrect');
        });
    }else {
        endQuiz();
        console.log("No more questions left.");
    }
}

nextQuestionBtn.addEventListener('click', nextQuestion);

const endQuiz = () => {
    clearInterval(timerInterval);
    quizScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');
    finalScoreElement.textContent = score;
    totalQuestionsElement.textContent = shuffledQuestions.length;
    highScoreFunctn();
    nextQuestionBtn.classList.add('hidden');
}

const resetQuiz = () => {
    initQuiz();
}
resetButton.addEventListener('click', () => {
    resetQuiz();
    startQuiz();
})

const highScoreFunctn = () => {
    if (score > highScore) {
        highScore = score;
    }
    highScoreElement.textContent = highScore;
}