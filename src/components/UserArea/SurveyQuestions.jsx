import React, { useEffect, useState } from 'react';
import PostService from '../../API/PostService';
import MyButton from '../UI/button/MyButton';
import RadioGroup from '../UI/RadioGroup/RadioGroup';

const SurveyQuestions = () => {
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
            <div className="questAnswerGroup">
                <div className="questions">
                    {questions.length > 0 && <h2>{questions[currentQuestionIndex].title}</h2>}
                </div>

                <div className="answers">
                    <RadioGroup
                        options={questions[currentQuestionIndex].options}
                        onChange={handleValueChange}
                        required
                    />
                </div>
            </div>

            <div className="buttons">
                <MyButton onClick={handleNextQuestion}>
                    {currentQuestionIndex === questions.length - 1 ? 'Завершити опитування' : 'Наступне питання'}
                </MyButton>
            </div>
        </div>
    );
};

export default SurveyQuestions;
