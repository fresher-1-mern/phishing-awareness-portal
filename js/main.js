/* Main page behaviour: mobile navigation and Google Forms connection. */

// 1) Paste your public Google Forms respondent link here.
// Example: https://docs.google.com/forms/d/e/FORM_ID/viewform
const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfsxTWJQVdTaNmbjYEzZB4v2QmFinBYxfOei179tk80ke9cBA/viewform?usp=publish-editor";

const menuToggle = document.querySelector("#menu-toggle");
const primaryNav = document.querySelector("#primary-nav");

if (menuToggle && primaryNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!isOpen));
    menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
    primaryNav.classList.toggle("is-open", !isOpen);
  });

  // Close the mobile menu after the user chooses a section.
  primaryNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
  });

  // If the viewport grows to desktop width, reset the mobile menu state.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 736) {
      primaryNav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
  });
}

const surveyLink = document.querySelector("#survey-link");
const surveyStatus = document.querySelector("#survey-status");

if (surveyLink && surveyStatus) {
  const formUrlIsSet =
    GOOGLE_FORM_URL.startsWith("https://docs.google.com/forms/") &&
    !GOOGLE_FORM_URL.includes("PASTE_YOUR");

  if (formUrlIsSet) {
    surveyLink.href = GOOGLE_FORM_URL;
    surveyLink.target = "_blank";
    surveyStatus.textContent = "Opens the community survey in a new tab.";
  } else {
    surveyLink.href = "#survey";
    surveyLink.removeAttribute("target");
    surveyLink.addEventListener("click", (event) => {
      event.preventDefault();
      surveyStatus.textContent = "Something is wrong";
    });
  }
}
