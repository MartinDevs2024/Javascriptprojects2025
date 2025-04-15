const quizData = [
  {
    question: "Which language runs in a web browser?",
    choices: ["Java", "C", "Python", "JavaScript"],
    correct: "JavaScript",
  },
  {
    question: "What does CSS stand for?",
    choices: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: "Cascading Style Sheets",
  },
  {
    question: "What does HTML stand for?",
    choices: [
      "Hypertext Markup Language",
      "Hyper Tool Multi Language",
      "Hyperlinks and Text Markup Language",
      "Home Tool Markup Language",
    ],
    correct: "Hypertext Markup Language",
  },
  {
    question: "What year was JavaScript launched?",
    choices: ["1996", "1995", "1994", "None of the above"],
    correct: "1995",
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const timeEl = document.getElementById("timer");
const restartBtn = document.getElementById("restartBtn");
const quizContainer = document.getElementById("quiz");

function startQuiz() {
  showQuestion();
  startTimer();
  nextBtn.style.display = "none";
  resultEl.classList.add("hidden");
}

function showQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  choicesEl.innerHTML = "";

  q.choices.forEach((choice) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.addEventListener("click", () => selectAnswer(btn, q.correct));
    choicesEl.appendChild(btn);
  });
}

function selectAnswer(button, correctAnswer) {
  const selected = button.textContent;

  Array.from(choicesEl.children).forEach((btn) => {
    btn.disabled = true;
    if (btn.textContent === correctAnswer) {
      btn.style.borderColor = "#00ffcc";
    }
    if (btn.textContent === selected && selected !== correctAnswer) {
      btn.style.borderColor = "#ff4d4d";
    }
  });

  if (selected === correctAnswer) {
    score++;
  }

  nextBtn.style.display = "inline-block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    showQuestion();
    nextBtn.style.display = "none";
  } else {
    endQuiz();
  }
}

function startTimer() {
  timeEl.textContent = timeLeft;

  timer = setInterval(() => {
    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  clearInterval(timer);
  quizContainer.classList.add("hidden");
  resultEl.textContent = `You scored ${score} out of ${quizData.length}!`;
  resultEl.classList.remove("hidden");
  restartBtn.classList.remove("hidden");
}

nextBtn.addEventListener("click", nextQuestion);

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  timeLeft = 30;
  resultEl.classList.add("hidden");
  restartBtn.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  timeEl.textContent = timeLeft;
  startQuiz();
});

// Start on page load
startQuiz();
