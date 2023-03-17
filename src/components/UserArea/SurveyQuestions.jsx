import React, { useEffect, useState } from 'react';
import PostService from '../../API/PostService';
import MyButton from '../UI/button/MyButton';
import RadioGroup from '../UI/RadioGroup/RadioGroup';
// import MyInput from '../UI/input/MyInput';
// import MyTextArea from '../UI/textArea/MyTextArea';

const SurveyQuestions = () => {
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
                    <div className="questAnswerGroup">
                        <div className="questions">
                            <h2>{questions[currentQuestionIndex].title}</h2>
                        </div>

                        <div className="answers">
                            {(questions[currentQuestionIndex].type === 'boolean' ||
                                questions[currentQuestionIndex].type === 'select') && (
                                <RadioGroup
                                    options={questions[currentQuestionIndex].options}
                                    onChange={handleValueChange}
                                    required
                                />
                            )}
                        </div>
                    </div>
                    <div className="buttons">
                        <MyButton onClick={handleNextQuestion}>
                            {currentQuestionIndex === questions.length - 1
                                ? 'Завершити опитування'
                                : 'Наступне питання'}
                        </MyButton>
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
