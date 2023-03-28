# [Questionnaire](https://github.com/sergeiown/questionnaire/blob/main/src/assets/logo/logo.svg) <img src="https://github.com/sergeiown/questionnaire/blob/main/src/assets/logo/logo.svg" alt="Questionnaire logo" align="right" width="300"/>

## Simplify your surveys with Questionnaire!
### An application for conducting surveys with clients / customers / focus group members in real life.

---

**The version with the Ukrainian interface is currently available. The development of an English-language interface is planned.**

**Current functionality:**

***Admin area:***
- Authentication (using Google sign-in);
- Authorization (using internal roles);
- Notification of the user's completion of the survey (by receiving an email);
- Results manager:
  * Viewing the list of previously conducted surveys;
  * Receiving the results of any of the available surveys in XLSX format;
  * Delete a survey you no longer need;

- Control panel:
  * Create a new survey;
  * Add a question to the survey:
    + Selecting a question type;
    + Selecting whether the answer is required; 
    + Add answer options if necessary;
    + Delete an answer option;
  * Delete a question;
  * Select and add an image for the survey topic;
  * Add a survey title;
  * Sort the questions added to the survey as needed;
  * Filter the questions added to the survey as needed;
  * Search for a question by its content;
  * Choose a color for the survey design using the color palette or color picker;
  * Adding an email address to receive notifications (the default email address from your Google account is used);
  * Exit with saving the results (copying the link to the corresponding survey to the clipboard);
  * Exit without saving the results;
  * Applying temporary storage of intermediate data in case of atypical situations;

***User area:***
- Completing the survey by answering questions one by one;
- Validation of answers:
  + By data compliance;
  + By mandatory data entry;
- Visual display of the survey progress;
- Textual display of the survey progress;
- Visual design and sequence of questions in accordance with the administrator's preferences;
- Notification of completion of the survey.

---
**This application was developed using [React](https://react.dev/).**  
**This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).**

**To develop the application, the following additional libraries were used:**
| Library                 | Version     | Purpose                                                     |
|-------------------------|-------------|------------------------------------------------------------|
| clipboard-polyfill      | ^4.0.0      | Polyfill for working with the clipboard                     |
| emailjs-com             | ^3.2.0      | Library for sending emails                                  |
| firebase                | ^8.10.1     | Infrastructure for developing web applications              |
| firebase/firestore      |             | Component for storing and retrieving data                   |
| firebase/auth           |             | Component for user authentication                            |
| firebase/app-check      |             | Component for protecting web applications                    |
| react-google-recaptcha  | ^2.1.0      | Component for interacting with reCAPTCHA                     |
| xlsx                    | ^0.19.2     | Library for working with electronic spreadsheets            |

### Application structure:
![image](https://user-images.githubusercontent.com/112722061/227899517-9ea75427-03b8-4105-8774-c91068125168.png)

---

### Appearance of the application:
![image](https://user-images.githubusercontent.com/112722061/227651331-5ba289e2-a6c2-404d-818e-76d0cc006a74.png)
--
![image](https://user-images.githubusercontent.com/112722061/227652470-a083d4dc-5f77-409c-8716-226c3134aee3.png)
--
![image](https://user-images.githubusercontent.com/112722061/227652528-0ba8dd06-640d-4b28-a7a0-9faa07fe65d7.png)
--
![image](https://user-images.githubusercontent.com/112722061/227652325-b7600493-457a-4de2-b262-db77f4e67f20.png)
--
![image](https://user-images.githubusercontent.com/112722061/227948744-5b34b548-481e-4bcd-bcf9-99fa881365f2.png)

