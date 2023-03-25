import React from 'react';
import RadioGroup from '../UI/RadioGroup/RadioGroup';
import MyInput from '../UI/input/MyInput';
import { useState, useEffect } from 'react';
import MyTextArea from '../UI/textArea/MyTextArea';
import MyButton from '../UI/button/MyButton';

const SurveyAnswers = ({ quests, currentIndex, valueChange, nextQuestion, required, color }) => {
    const questions = quests;
    const currentQuestionIndex = currentIndex;
    const [customValue, setCustomValue] = useState('');

    const handleRadioValueChange = (event) => {
        setCustomValue(event);
    };

    const handleCustomValueChange = (event) => {
        setCustomValue(event.target.value);
    };

    const handleNextQuestion = (e) => {
        e.preventDefault();

        nextQuestion();

        valueChange(customValue);

        const checkedRadio = document.querySelector('input[type="radio"]:checked');
        if (checkedRadio) {
            checkedRadio.checked = false;
        }
    };

    const scrollToQuestion = () => {
        const question = document.querySelector('h3');
        question.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    useEffect(() => {
        document.title = `Questionnaire ( ${currentQuestionIndex + 1} / ${questions.length} )`;
        setCustomValue('');
        scrollToQuestion();
    }, [currentQuestionIndex]);

    return (
        <form onSubmit={handleNextQuestion}>
            <div className="questionsAndAnswers" style={{ borderColor: color }}>
                <div className="questions">
                    <h3>
                        {questions[currentQuestionIndex].title}
                        {questions[currentQuestionIndex].required === 'true' && (
                            <span> (відповідь обов&apos;язкова)</span>
                        )}
                    </h3>
                </div>

                <div className="answers">
                    {questions[currentQuestionIndex].type === 'select' && <p>Варіанти відповідей:</p>}
                    {(questions[currentQuestionIndex].type === 'boolean' ||
                        questions[currentQuestionIndex].type === 'select') && (
                        <RadioGroup
                            options={questions[currentQuestionIndex].options}
                            onChange={handleRadioValueChange}
                            required={required === 'true' ? 'required' : ''}
                            color={color}
                        />
                    )}

                    {questions[currentQuestionIndex].type === 'email' && (
                        <MyInput
                            type="email"
                            value={customValue}
                            placeholder="Введіть email..."
                            onChange={handleCustomValueChange}
                            required={required === 'true' ? 'required' : ''}
                            style={{
                                borderColor: customValue && customValue.length > 0 ? color : '#800000ff',
                            }}
                        />
                    )}

                    {questions[currentQuestionIndex].type === 'text' && (
                        <MyTextArea
                            value={customValue}
                            onChange={handleCustomValueChange}
                            required={required === 'true' ? 'required' : ''}
                            style={{
                                borderColor: customValue && customValue.length > 0 ? color : '#800000ff',
                            }}
                        />
                    )}
                </div>

                <div className="progressBar">
                    <div
                        className="progress"
                        style={{
                            width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
                            backgroundColor: color,
                        }}
                    ></div>
                </div>

                <div
                    className="counter"
                    style={{
                        color: color,
                    }}
                >
                    <p>
                        Питання {currentQuestionIndex + 1} / <span>{questions.length}</span>
                    </p>
                </div>
            </div>

            <div className="buttons">
                <MyButton color={color} onSubmit={handleNextQuestion}>
                    {currentQuestionIndex === questions.length - 1 ? 'Завершити опитування' : 'Наступне питання'}
                </MyButton>
            </div>
        </form>
    );
};

export default SurveyAnswers;
