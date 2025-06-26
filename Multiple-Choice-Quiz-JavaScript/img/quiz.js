const questions = [
  {
    question: "What does HTML stand for?",
    imgSrc: "img/html.png",
    choices: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlinks Text Mark Language"
    ],
    correct: "HyperText Markup Language"
  },
  {
    question: "What does CSS stand for?",
    imgSrc: "img/css.png",
    choices: [
      "Cascading Style Sheets",
      "Creative Style System",
      "Coding Sheet Style"
    ],
    correct: "Cascading Style Sheets"
  },
  {
    question: "What does JS stand for?",
    imgSrc: "img/js.png",
    choices: [
      "JavaSource",
      "JavaScript",
      "JustScript"
    ],
    correct: "JavaScript"
  }
];

let current = 0;
let score = 0;
let timeLeft = 10;
let timerInterval;

const questionEl = document.getElementById("question");
const qImg = document.getElementById("qImg");
const optionsEl = document.getElementById("options");
const scoreEl = document.getElementById("score");
const resultEl = document.getElementById("result");
const timeDisplay = document.getElementById("time");

function loadQuestion() {
  clearInterval(timerInterval);
  timeLeft = 10;
  timeDisplay.innerText = timeLeft;

  if (current >= questions.length) {
    endQuiz();
    return;
  }

  const q = questions[current];
  questionEl.innerText = q.question;
  qImg.src = q.imgSrc;

  optionsEl.innerHTML = "";
  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.innerText = choice;
    btn.onclick = () => {
      clearInterval(timerInterval);
      checkAnswer(choice);
    };
    optionsEl.appendChild(btn);
  });

  timerInterval = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft === 0) {
      clearInterval(timerInterval);
      checkAnswer(null);
    }
  }, 1000);
}

function checkAnswer(answer) {
  if (answer === questions[current].correct) {
    score++;
  }
  current++;
  loadQuestion();
}

function endQuiz() {
  const percent = Math.round((score / questions.length) * 100);

  questionEl.style.display = "none";
  qImg.style.display = "none";
  optionsEl.style.display = "none";
  document.getElementById("timer").style.display = "none";
  resultEl.style.display = "block";

  // Final score with percent + correct/total
  scoreEl.innerHTML = `Your Score: ${percent}% (${score} out of ${questions.length})`;

  // Emoji face using score.png
  const emojiIndex = getEmojiIndex(percent);
  const emoji = document.createElement("div");
  emoji.style.width = "100px";
  emoji.style.height = "100px";
  emoji.style.margin = "10px auto";
  emoji.style.backgroundImage = "url('img/score.png')";
  emoji.style.backgroundSize = "500px 100px";
  emoji.style.backgroundPosition = `-${emojiIndex * 100}px 0px`;

  resultEl.appendChild(emoji);
  resultEl.appendChild(document.createElement("br"));

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "🔁 Restart";
  restartBtn.onclick = restartQuiz;
  resultEl.appendChild(restartBtn);
}

function getEmojiIndex(percent) {
  if (percent >= 80) return 4;
  if (percent >= 60) return 3;
  if (percent >= 40) return 2;
  if (percent >= 20) return 1;
  return 0;
}

function restartQuiz() {
  current = 0;
  score = 0;
  resultEl.innerHTML = '';
  questionEl.style.display = "block";
  qImg.style.display = "block";
  optionsEl.style.display = "block";
  document.getElementById("timer").style.display = "block";
  resultEl.style.display = "none";
  loadQuestion();
}

// Start quiz
loadQuestion();
