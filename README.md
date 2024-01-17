# [Questionnaire](https://github.com/sergeiown/questionnaire)

![image](https://github.com/sergeiown/questionnaire/assets/112722061/24cca864-e673-462b-97a6-a17a9ce26f24)

## Simplify the process of creating and conducting surveys with clients, employees, and other participants using Questionnaire. This application provides full functionality for creating surveys, managing results, and offers a user-friendly interface for both administrators and users

## *Current version 1.0.1 (improved email messages)*

### Functionality

***General:***

- Fully responsive design.

***Admin area:***

- Authentication (using Google sign-in);
- Authorization (using internal roles);
- Notification of the user's completion of the survey (by receiving an email);
- Results manager:

  - Viewing the list of previously conducted surveys;
  - Receiving the results of any of the available surveys in XLSX format;
  - Delete a survey you no longer need;

- Control panel:
  - Create a new survey;
  - Add a question to the survey:
    - Selecting a question type;
    - Selecting whether the answer is required;
    - Add answer options if necessary;
    - Delete an answer option;
  - Delete a question using the appropriate interface element;
  - Change the order of the questions using the appropriate interface elements;
  - Select and add an image for the survey topic;
  - Add a survey title;
  - Sort the questions added to the survey as needed;
  - Filter the questions added to the survey as needed;
  - Search for a question by its content;
  - Choose a color for the survey design using the color palette or color picker;
  - Adding an email address to receive notifications (the default email address from your Google account is used);
  - Exit with saving the results;
  - Copy the link to the created survey to the clipboard;
  - Notification of creating a new survey;
  - Exit without saving the results;
  - Applying temporary storage of intermediate data in case of atypical situations.

***User area:***

- Completing the survey by answering questions one by one;
- Validation of answers:
  - By data compliance;
  - By mandatory data entry;
- Visual display of the survey progress;
- Textual display of the survey progress;
- Visual design and sequence of questions in accordance with the administrator's preferences;
- Notification of completion of the survey;
- Prevent multiple surveys from being conducted from a single device (five-minute limit).

**The version with the Ukrainian interface is currently available. The development of an English-language interface is planned.**

---

**This application was developed using [React](https://react.dev/).**  
**This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**

**To develop the application, the following additional libraries were used:**
| Library | Version | Purpose |
|-------------------------|-------------|------------------------------------------------------------|
| clipboard-polyfill | ^4.0.0 | Polyfill for working with the clipboard |
| emailjs-com | ^3.2.0 | Library for sending emails |
| firebase | ^8.10.1 | Infrastructure for developing web applications |
| firebase/firestore | | Component for storing and retrieving data |
| firebase/auth | | Component for user authentication |
| firebase/app-check | | Component for protecting web applications |
| react-google-recaptcha | ^2.1.0 | Component for interacting with reCAPTCHA |
| xlsx | ^0.19.2 | Library for working with electronic spreadsheets |

---

### Application structure

![image](https://github.com/sergeiown/questionnaire/assets/112722061/ccf45333-5078-4b6b-be81-b21cb0e8d047)

---

### Appearance

|                           |         |         |
|---------------------------|---------|---------|
| Application               | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/f828374b-2ab4-47ff-bfda-943d0c1c72d4) | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/774f9f7a-cdfe-4bdc-bb70-67a6dc3f9ec7) |
| Admin Area                | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/12cd2549-7b67-4dce-a4cb-774f001be67b) | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/22b1ad68-df79-4e35-90bb-c191a536ca48) |
| Admin Area                | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/0a799729-7c9c-4eee-975f-4b8445e9f239) | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/1786c91e-a846-4650-bcb2-5fed39fa92a1) |
| User Area                 | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/48ad5fa2-e2ca-4abe-b5d8-7da89d7d73ac) | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/3e348004-1e26-4c0c-ab84-21aadef31a4a) |
| RWD Mobile                | ![image](https://github.com/sergeiown/questionnaire/assets/112722061/965f3499-f9e8-4166-9593-d8da5e7fa397) |         |

---
( ͡° ͜ʖ ͡°)
