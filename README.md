# ScamSense — Phishing and Online Scam Awareness Portal

A simple, responsive front-end CEP project made with HTML, CSS, and vanilla JavaScript.

## What is included?

- Single-page layout with section scrolling.
- Responsive mobile hamburger menu.
- Scam-awareness learning cards and a fictional phishing-message example.
- Five-question interactive quiz with feedback and score.
- Google Forms survey link placeholder.
- Two small charts that display aggregate survey counts entered in `js/analytics.js`.
- No backend, login, database, or personal-data collection.

## Run the website

1. Extract the ZIP file.
2. Open `index.html` in a modern browser.
3. Test navigation, mobile layout, quiz, and charts.

For a closer-to-hosted test, open the folder in VS Code and use the Live Server extension if available. This is optional; the site is static.

## Connect a Google Form

1. Create a Google Form for the community survey.
2. Suggested title: **Phishing Awareness and Website Feedback Survey**.
3. Suggested questions:
   - Which is a warning sign of a possible phishing message? (Multiple choice: Urgent threat; Unexpected link; Request for OTP; Unusual sender.)
   - How confident do you feel about spotting suspicious messages? (Multiple choice: Not confident; A little; Fairly confident; Very confident.)
   - Optional: Which part of the portal was most useful? (Multiple choice or short answer, without personal details.)
4. Do not ask for names, email addresses, phone numbers, passwords, OTPs, or other identifying information. Check the form settings and turn off email collection if it is not needed.
5. Use **Send** / **Publish** in Google Forms to obtain the respondent link. Paste that link into `GOOGLE_FORM_URL` in `js/main.js`, replacing `PASTE_YOUR_GOOGLE_FORM_VIEWFORM_URL_HERE`.
6. The survey button on the website will then open the form in a new tab.
7. Share the published website link or its QR code with participants. They can use the site on their phones and submit the survey.

The Google Form is separate from the website's JavaScript. Responses are stored in the Google Form account, not in this static website.

## How to update the two charts with real data

1. Open the Google Form's **Responses** tab and review the summary charts.
2. Or click the Sheets icon to open/export response data.
3. Count the number of responses for each answer option in the two chart questions.
4. Open `js/analytics.js`.
5. Replace the zero values in `warningSigns` and `confidence` with the actual aggregate counts.
6. Update `collectedResponses` to the total number of completed survey responses included.
7. Save and reload the website.

Example only (not project data): if 4 people chose “Urgent threat”, change that item's `count: 0` to `count: 4`. Do this only using the actual response totals. The chart labels should match the question options used in your form.

The charts do not automatically sync with Google Forms. For this project, manual aggregate updates avoid the need for a backend or third-party API. The Google Forms response summary can also be captured directly as a report screenshot.

## Suggested testing checklist

- Open every navigation link on desktop and mobile.
- Open and close the mobile menu.
- Answer every quiz question and check the feedback and final score.
- Try restarting the quiz.
- Check the survey link after configuring it.
- Enter a few temporary test counts in `analytics.js` to test the chart layout, then reset them to zero until actual survey data is available.
- Check that no private information is being requested or displayed.

## Important limitations

- Quiz answers are processed only in the current browser session; quiz results are not centrally collected.
- Survey data is collected separately by Google Forms.
- The two charts on the website are manually updated from aggregate Google Forms counts.
- This is an educational awareness quiz, not a real-time fraud detection tool.
- Do not claim survey findings or improvements that are not supported by actual responses.
