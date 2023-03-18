import React, { useEffect, useState } from 'react';
import PostService from '../../API/PostService';
import SurveyAnswers from './SurveyAnswers';

const SurveyQuestions = ({ color }) => {
    const [questions, setQuestions] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const fetchSavedQuestions = async () => {
        const savedQuestions = localStorage.getItem('questions');
        if (savedQuestions) {
            setQuestions(JSON.parse(savedQuestions));
        } else {
            const questions = await PostService.get();
            setQuestions(questions);
            localStorage.setItem('questions', JSON.stringify(questions));
        }
    };

    useEffect(() => {
        fetchSavedQuestions();
    }, []);

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleValueChange = (newValue) => {
        console.log(newValue);
    };

    return (
        <div className="questionsWrapper">
            {questions.length > 0 ? (
                <>
                    <div className="questAnswerGroup" style={{ borderColor: color }}>
                        <div className="questions">
                            <h2>{questions[currentQuestionIndex].title}</h2>
                        </div>

                        <SurveyAnswers
                            quests={questions}
                            currentIndex={currentQuestionIndex}
                            valueChange={handleValueChange}
                            nextQuestion={handleNextQuestion}
                            required={questions[currentQuestionIndex].required}
                            color={color}
                        />
                    </div>
                </>
            ) : (
                <div className="emptyQuestions">
                    <h2>Питання не знайдені...</h2>
                </div>
            )}
        </div>
    );
};

export default SurveyQuestions;
