import React, { useEffect, useState } from 'react';
import PostService from '../../API/PostService';
import SurveyAnswers from './SurveyAnswers';
import Loader from '../UI/Loader/Loader';

const SurveyQuestions = ({ color, questionsSubmit }) => {
    const [questions, setQuestions] = useState([]);
    const date = new Date().toLocaleDateString('uk-UA');
    const time = new Date().toLocaleTimeString('uk-UA', { hour: '2-digit', minute: '2-digit' });
    const [answers, setAnswers] = useState([date, time]);
    const [isLoading, setIsLoading] = useState(true);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

    const fetchSavedQuestions = async () => {
        const questions = await PostService.get();
        setQuestions(questions);
        if (isLoading) {
            setTimeout(() => setIsLoading(false), 1000);
        }
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handleValueChange = (newValue) => {
        setAnswers([...answers, newValue]);
    };

    useEffect(() => {
        fetchSavedQuestions();
    }, []);

    useEffect(() => {
        if (answers.length > 2 && answers.length === questions.length + 2) {
            questionsSubmit(answers);
        }
    }, [answers]);

    return isLoading ? (
        <div className="loader">
            <Loader />
        </div>
    ) : (
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
