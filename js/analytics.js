
const surveyData = [
  {
    question: "Have you ever received a suspicious message, email, or phone call?",
    labels: ["Yes", "No", "Not sure"],
    values: [1, 5, 4]
  },
  {
    question: "Which of these could be a warning sign of an online scam?",
    labels: ["OTP request", "Guaranteed prize", "Pressure to act immediately", "All of the above"],
    values: [4, 3, 3, 0]
  },
  {
    question: "What would you do with a suspicious link from an unknown sender?",
    labels: ["Open it immediately", "Share with friends", "Avoid and verify", "Not sure"],
    values: [3, 3, 3, 1]
  },
  {
    question: "What should you do if someone asks for your OTP over a phone call?",
    labels: ["Share if genuine", "Share if bank caller", "Never share and verify", "Not sure"],
    values: [4, 2, 2, 2]
  },
  {
    question: "How can you check whether a website link is suspicious?",
    labels: ["Check domain and verify", "Trust a stranger's link", "Enter personal details", "Not sure"],
    values: [3, 3, 1, 3]
  },
  {
    question: "How often do you verify a message before clicking its link?",
    labels: ["Always", "Sometimes", "Rarely", "Never"],
    values: [2, 2, 5, 1]
  },
  {
    question: "What should you do if you entered your password on a fake website?",
    labels: ["Do nothing", "Change password and secure account", "Tell a friend", "Not sure"],
    values: [4, 2, 1, 3]
  },
  {
    question: "What should you do if you suspect online financial fraud in India?",
    labels: ["Ignore", "Social media only", "Contact bank and report officially", "Not sure"],
    values: [2, 2, 6, 0]
  },
  {
    question: "After exploring the website, how confident are you identifying phishing messages?",
    labels: ["Very confident", "Somewhat confident", "Slightly confident", "Not confident yet"],
    values: [6, 3, 0, 1]
  },
  {
    question: "How useful did you find the website?",
    labels: ["Very useful", "Somewhat useful", "Slightly useful", "Not useful"],
    values: [2, 3, 5, 0]
  }
];

function renderAnalytics() {
  const chartsGrid = document.getElementById("charts-grid");
  const dataStatus = document.getElementById("data-status");

  if (!chartsGrid) return;

  chartsGrid.innerHTML = surveyData.map((item, index) => {
    const counts = item.values.map(value =>
      Math.max(0, Number(value) || 0)
    );

    const total = counts.reduce((sum, count) => sum + count, 0);

    const rows = item.labels.map((label, i) => {
      const count = counts[i] || 0;
      const percentage = total
        ? Math.round((count / total) * 100)
        : 0;

      return `
        <div class="analytics-item">
          <div class="analytics-label">
            <span>${label}</span>
            <strong>${count} (${percentage}%)</strong>
          </div>

          <div class="analytics-track">
            <div
              class="analytics-bar"
              style="width: ${percentage}%"
              role="progressbar"
              aria-valuenow="${percentage}"
              aria-valuemin="0"
              aria-valuemax="100"
            ></div>
          </div>
        </div>
      `;
    }).join("");

    return `
      <article class="chart-card">
        <div class="chart-card-heading">
          <div>
            <p class="card-kicker">QUESTION ${index + 1}</p>
            <h3>${item.question}</h3>
          </div>
        </div>

        <div class="bar-chart">
          ${rows}
        </div>

        <div class="chart-footer">
          <span>${total} responses</span>
          <span>Community survey</span>
        </div>

        ${total === 0
          ? '<p class="chart-empty">Add actual survey counts in analytics.js.</p>'
          : ""}
      </article>
    `;
  }).join("");

  const totalEntered = surveyData.reduce(
    (sum, item) =>
      sum + item.values.reduce(
        (questionSum, value) => questionSum + (Number(value) || 0),
        0
      ),
    0
  );

  if (dataStatus) {
    dataStatus.textContent = totalEntered > 0
      ? "Response counts entered. Check each question total against Google Forms."
      : "Waiting for actual survey response counts in js/analytics.js.";
  }
}

document.addEventListener("DOMContentLoaded", renderAnalytics);
