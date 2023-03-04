import '../src/assets/styles/App.css';
import React from 'react';
import QuestionList from './components/QuestionList';

function App() {
    return (
        <div>
            <h1>Question List</h1>
            <QuestionList />
        </div>
    );
}

export default App;
