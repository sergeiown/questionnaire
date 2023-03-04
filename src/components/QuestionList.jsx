import React, { useState } from 'react';
import Question from './Question';

const QuestionList = () => {
    const [questions, setQuestions] = useState([{ id: 1, question: '', type: 'text', options: '' }]);

    const handleAddQuestion = () => {
        const newId = questions.length + 1;
        setQuestions([...questions, { id: newId, question: '', type: 'text', options: '' }]);
    };

    const handleUpdateQuestion = (id, question) => {
        const updatedQuestions = questions.map((q) => {
            if (q.id === id) {
                return { ...q, question };
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    const handleUpdateType = (id, type) => {
        const updatedQuestions = questions.map((q) => {
            if (q.id === id) {
                return { ...q, type };
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    const handleUpdateOptions = (id, options) => {
        const updatedQuestions = questions.map((q) => {
            if (q.id === id) {
                return { ...q, options };
            }
            return q;
        });
        setQuestions(updatedQuestions);
    };

    const handleSave = () => {
        console.log('Questions:', questions);
    };

    return (
        <div>
            {questions.map((q) => (
                <Question
                    key={q.id}
                    question={q.question}
                    type={q.type}
                    options={q.options}
                    onUpdateQuestion={(question) => handleUpdateQuestion(q.id, question)}
                    onUpdateType={(type) => handleUpdateType(q.id, type)}
                    onUpdateOptions={(options) => handleUpdateOptions(q.id, options)}
                />
            ))}

            <button onClick={handleAddQuestion}>Add Question</button>
            <button onClick={handleSave}>Save Questions</button>
        </div>
    );
};

export default QuestionList;
