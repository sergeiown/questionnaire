import React, { useEffect, useState } from 'react';
import PostService from '../../API/PostService';
import SurveyAnswers from './SurveyAnswers';

const SurveyQuestions = ({ color }) => {
    const [questions, setQuestions] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const fetchSavedQuestions = async () => {
        const questions = await PostService.get();
        setQuestions(questions);
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
                    <SurveyAnswers
                        quests={questions}
                        currentIndex={currentQuestionIndex}
                        valueChange={handleValueChange}
                        nextQuestion={handleNextQuestion}
                        required={questions[currentQuestionIndex].required}
                        color={color}
                    />
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
