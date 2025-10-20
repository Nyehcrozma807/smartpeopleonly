const questions = [
  {
    question: "Which one is false?",
    choices: ["The sky is red", "The sky is blue", "Fun toys are fun", "False"],
    answer: 3
  },
  {
    question: "What is ゑゐいワいい in the International Phonetic Alphabet?",
    choices: ["/wø:wai:/", "/ゑəゐ1い/", "/ʋeʋi:ʋai:/", "/ʙˁ˥ʕʷɫ̚ːɴɤ̞̆̃dɮˁʲkʟ̝̊ʼʰˣː$ː/"],
    answer: 2
  },
  {
    question: "Jeff gets on a plane going at 613 miles per hour in a straight line going from Moscow, Russia to Funafuti, Tuvalu. Using this information, calculate the population of Hiroshima, Japan",
    choices: ["1.19 million", "🛩☢️💣", "0", "1.23 million"],
    answer: 0
  },
  {
    question: "What is the temperature of Papyrus's spaghetti in Rankine??",
    choices: ["Papyrus is my favorite Deltarune character and it's 68", "Papyrus isn't in Deltarune", "293", "536.67"],
    answer: 1
  },
  {
    question: "HTML stands for?",
    choices: [
      "HyperText Markup Language",
      "HyperTxt Markup Language",
      "HyperText Markuq Language",
      "НуреrTехт Маrкuр Lаnguаgе"
    ],
    answer: 0
  }
];

let score = 200;
let current = 0;
let answered = false;

const scoreEl = document.getElementById("score");
const questionContainer = document.getElementById("question-container");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const restartBtn = document.getElementById("restartBtn");
const endScreen = document.getElementById("end-screen");
const quizSection = document.getElementById("quiz");
const finalScoreEl = document.getElementById("final-score");
const playAgainBtn = document.getElementById("play-again");

function updateScoreDisplay() {
  scoreEl.textContent = score;
}

function renderQuestion() {
  answered = false;
  nextBtn.disabled = true;
  feedbackEl.textContent = "";
  const q = questions[current];
  questionContainer.textContent = (current + 1) + ". " + q.question;

  choicesEl.innerHTML = "";
  q.choices.forEach((c, idx) => {
    const btn = document.createElement("button");
    btn.className = "choice";
    btn.type = "button";
    btn.textContent = c;
    btn.dataset.index = idx;
    btn.addEventListener("click", onChoiceClicked);
    choicesEl.appendChild(btn);
  });
}

function onChoiceClicked(e) {
  if (answered) return;
  answered = true;

  const selected = Number(e.currentTarget.dataset.index);
  const q = questions[current];
  const choiceButtons = Array.from(choicesEl.children);

  if (selected === q.answer) {
    e.currentTarget.classList.add("correct");
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "";
    // Score unchanged for a correct answer (per requirement)
  } else {
    e.currentTarget.classList.add("wrong");
    // highlight correct answer
    const correctBtn = choiceButtons.find(b => Number(b.dataset.index) === q.answer);
    if (correctBtn) correctBtn.classList.add("correct");
    feedbackEl.textContent = "Wrong — 10 points deducted.";
    feedbackEl.style.color = "";
    score = Math.max(0, score - 10);
    updateScoreDisplay();
  }

  // enable next (or finish)
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current >= questions.length) {
    finishQuiz();
  } else {
    renderQuestion();
  }
});

restartBtn.addEventListener("click", resetQuiz);
playAgainBtn.addEventListener("click", resetQuiz);

function finishQuiz() {
  quizSection.classList.add("hidden");
  endScreen.classList.remove("hidden");
  finalScoreEl.textContent = score;
}

function resetQuiz() {
  score = 200;
  current = 0;
  updateScoreDisplay();
  quizSection.classList.remove("hidden");
  endScreen.classList.add("hidden");
  renderQuestion();
}

// init
updateScoreDisplay();
renderQuestion();
