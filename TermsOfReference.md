# Terms of reference for a web application.

## Working title: "Questionnaire".

Main interface language: Ukrainian.

### Functionality:

-   Ability for ordinary users to answer questions in surveys.
-   Ability for the administrator to create a new survey, delete an old one.
-   Ability to receive survey results by e-mail for administrators.
-   Ability to receive survey results in tabular form (xlsx).
-   Authentication and authorization for administrators who can create new surveys.

### Technologies:

-   Front-End: JavaScript, React.
-   Back-End / or implementation on a static server: XLSX + SendGrid.
-   Authentication: Google sign-in.
-   Data storage: Firestore Database + Firebase Storage.

### Design:

-   For users: simple and intuitive interface for answering questions.
-   For administrators: interface for creating and managing surveys.

### Implementation details in order of priority:

-   Implement survey creation and management for administrators.
-   Implement an authorization mechanism for administrators.
-   Implement the ability to answer questions for ordinary users.
-   Implement the ability to receive survey results for administrators.
-   Implement protection against multiple voting from one user in one poll.
-   Implement interface localization for different languages (eng, etc.).

---

# Технічне завдання на веб-додаток.

## Робоча назва: "Questionnaire".

Основна мова інтерфейсів: українська.

### Функціональність:

-   Можливість для звичайних користувачів відповідати на запитання в опитуваннях.
-   Можливість для адміністратора створити нове опитування, видалити старе.
-   Можливість отримати на електронну пошту результати опитувань для адміністраторів.
-   Можливість отримання результатів опитування в табличному вигляді (xlsx).
-   Аутентифікація та авторизація для адміністраторів, які можуть створювати нові опитування.

### Технології:

-   Front-End: JavaScript, React.
-   Back-End / або реалізація на статичному сервері: XLSX + SendGrid.
-   Аутентифікація: Google sign-in.
-   Зберігання даних: Firestore Database + Firebase Storage.

### Дизайн:

-   Для користувачів: простий та інтуїтивно зрозумілий інтерфейс для відповіді на запитання.
-   Для адміністраторів: інтерфейс для створення та управління опитуваннями.

### Деталі реалізації в порядку пріоритетності:

-   Реалізувати створення та управління опитуваннями для адміністраторів.
-   Реалізувати механізм авторизації для адміністраторів.
-   Реалізувати можливість відповіді на запитання для звичайних користувачів.
-   Реалізувати можливість отримання результатів опитувань для адміністраторів.
-   Реалізувати захист від множинного голосування від одного користувача в одному опитуванні.
-   Реалізувати локалізацію інтерфейсу для різних мов (eng, etc.).
