import '../src/assets/styles/App.css';
import React from 'react';
import Question from './components/Question.jsx';

const App = () => {
    const handleSubmit = (question) => {
        console.log(question);
    };

    return (
        <div>
            <Question onSubmit={handleSubmit} />
        </div>
    );
};

export default App;
