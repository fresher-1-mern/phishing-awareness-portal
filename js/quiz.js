/* Scam Detection Quiz
   Questions are fictional learning scenarios. This quiz is not a real-world
   scam detector and does not send answers to a server. */

const quizQuestions = [
  {
    category: "URGENT MESSAGES",
    question: "You receive a message saying your bank account will be blocked in 10 minutes unless you click a link. What is the safest action?",
    answers: [
      "Click quickly so the account is not blocked.",
      "Open the bank's official app or type its known website address yourself.",
      "Reply with your account details and ask if it is genuine.",
      "Forward the message to friends to ask what they think."
    ],
    correctIndex: 1,
    explanation: "Urgency is a common pressure tactic. Verify the claim independently through the bank's official app, website, or published contact details."
  },
  {
    category: "PASSWORDS AND OTPs",
    question: "A caller claiming to be support asks you to read out an OTP to cancel a suspicious transaction. What should you do?",
    answers: [
      "Share it if the caller knows your name.",
      "Share only the first few digits.",
      "Do not share the OTP; end the call and contact the organisation through an official channel.",
      "Send the OTP by text instead of saying it."
    ],
    correctIndex: 2,
    explanation: "Never disclose an OTP, password, or banking PIN to a caller or in response to an unexpected message. Contact the organisation independently."
  },
  {
    category: "LINK CHECKING",
    question: "An email logo looks familiar, but the sender address and website link look unusual. What should you do?",
    answers: [
      "Trust it because the logo looks correct.",
      "Avoid the link and verify the message through the official website or app.",
      "Open the link in a private browser window.",
      "Download the attachment to see what it contains."
    ],
    correctIndex: 1,
    explanation: "Logos can be copied. Check the sender and destination carefully, and use an independently verified official channel instead of the supplied link."
  },
  {
    category: "PRIZES AND OFFERS",
    question: "A message says you won a prize you never entered for and must pay a small fee to claim it. What is the safest response?",
    answers: [
      "Pay the fee because it is small.",
      "Share your UPI PIN to receive the prize.",
      "Treat it as suspicious and verify the offer independently; do not pay or share sensitive information.",
      "Click the link but do not enter your name."
    ],
    correctIndex: 2,
    explanation: "Unexpected prizes and advance-fee requests are warning signs. Do not pay or provide credentials to claim an unsolicited reward."
  },
  {
    category: "SAFE ONLINE HABITS",
    question: "You are unsure whether a message from a service provider is genuine. Which habit is safest?",
    answers: [
      "Use the phone number or link included in the suspicious message.",
      "Ignore every message from every service provider.",
      "Verify using the official app, a website address you already know, or trusted contact details.",
      "Ask the sender to send the same message again."
    ],
    correctIndex: 2,
    explanation: "Independent verification reduces the chance of being directed back to a scammer. Use official channels you locate yourself."
  }
];

const quizState = {
  currentIndex: 0,
  selectedIndex: null,
  score: 0,
  answers: []
};

const questionCategory = document.querySelector("#question-category");
const questionText = document.querySelector("#question-text");
const answerList = document.querySelector("#answer-list");
const feedbackBox = document.querySelector("#feedback-box");
const quizAction = document.querySelector("#quiz-action");
const quizProgressText = document.querySelector("#quiz-progress-text");
const progressFill = document.querySelector("#progress-fill");
const quizContent = document.querySelector("#quiz-content");
const quizResult = document.querySelector("#quiz-result");
const resultTitle = document.querySelector("#result-title");
const resultScore = document.querySelector("#result-score");
const resultMessage = document.querySelector("#result-message");
const restartQuiz = document.querySelector("#restart-quiz");

function renderQuestion() {
  const question = quizQuestions[quizState.currentIndex];
  quizState.selectedIndex = null;

  quizProgressText.textContent = `Question ${quizState.currentIndex + 1} of ${quizQuestions.length}`;
  progressFill.style.width = `${(quizState.currentIndex / quizQuestions.length) * 100}%`;
  questionCategory.textContent = question.category;
  questionText.textContent = question.question;
  answerList.replaceChildren();
  feedbackBox.hidden = true;
  feedbackBox.className = "feedback-box";
  quizAction.disabled = true;
  quizAction.textContent = "Check answer";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-option";
    button.innerHTML = `<span class="answer-letter">${String.fromCharCode(65 + index)}</span><span></span>`;
    button.querySelector("span:last-child").textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answerList.append(button);
  });
}

function selectAnswer(index) {
  if (quizState.answers[quizState.currentIndex] !== undefined) return;
  quizState.selectedIndex = index;
  [...answerList.children].forEach((button, buttonIndex) => {
    button.classList.toggle("is-selected", buttonIndex === index);
  });
  quizAction.disabled = false;
}

function checkAnswer() {
  // First click checks the selected answer; the next click moves on.
  if (quizState.answers[quizState.currentIndex] !== undefined) {
    if (quizState.currentIndex < quizQuestions.length - 1) {
      quizState.currentIndex += 1;
      renderQuestion();
    } else {
      showResults();
    }
    return;
  }

  if (quizState.selectedIndex === null) return;

  const question = quizQuestions[quizState.currentIndex];
  const isCorrect = quizState.selectedIndex === question.correctIndex;
  quizState.answers[quizState.currentIndex] = isCorrect;
  if (isCorrect) quizState.score += 1;

  [...answerList.children].forEach((button, index) => {
    button.disabled = true;
    if (index === question.correctIndex) button.classList.add("is-correct");
    if (index === quizState.selectedIndex && !isCorrect) button.classList.add("is-incorrect");
  });

  feedbackBox.hidden = false;
  feedbackBox.classList.toggle("feedback-wrong", !isCorrect);
  feedbackBox.innerHTML = `<strong>${isCorrect ? "Correct — well spotted." : "Not quite — here's why."}</strong><span></span>`;
  feedbackBox.querySelector("span").textContent = question.explanation;
  quizAction.textContent = quizState.currentIndex === quizQuestions.length - 1 ? "See results" : "Next question";
  progressFill.style.width = `${((quizState.currentIndex + 1) / quizQuestions.length) * 100}%`;
}

function showResults() {
  quizContent.hidden = true;
  quizResult.hidden = false;
  resultScore.textContent = `Your score: ${quizState.score} / ${quizQuestions.length}`;

  if (quizState.score === quizQuestions.length) {
    resultTitle.textContent = "Excellent awareness!";
    resultMessage.textContent = "You recognised the warning signs in every scenario. Keep verifying unexpected messages.";
  } else if (quizState.score >= 3) {
    resultTitle.textContent = "Good progress!";
    resultMessage.textContent = "You spotted several warning signs. Review the explanations and keep practising.";
  } else {
    resultTitle.textContent = "Keep learning!";
    resultMessage.textContent = "Review the safety tips, then try again. Pausing and verifying are useful habits.";
  }

  progressFill.style.width = "100%";
}

function resetQuiz() {
  quizState.currentIndex = 0;
  quizState.selectedIndex = null;
  quizState.score = 0;
  quizState.answers = [];
  quizResult.hidden = true;
  quizContent.hidden = false;
  renderQuestion();
}

if (quizAction && restartQuiz) {
  quizAction.addEventListener("click", checkAnswer);
  restartQuiz.addEventListener("click", resetQuiz);
  renderQuestion();
}
