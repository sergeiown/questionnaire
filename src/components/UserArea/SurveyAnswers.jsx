import React from 'react';
import RadioGroup from '../UI/RadioGroup/RadioGroup';
import MyInput from '../UI/input/MyInput';
import { useState, useRef, useEffect } from 'react';
import MyTextArea from '../UI/textArea/MyTextArea';
import MyButton from '../UI/button/MyButton';

const SurveyAnswers = ({ quests, currentIndex, valueChange, nextQuestion, required, color }) => {
    const questions = quests;
    const currentQuestionIndex = currentIndex;
    const inputRef = useRef(null);
    const [customValue, setCustomValue] = useState('');

    const handleRadioValueChange = (event) => {
        setCustomValue(event);
        console.log(event);
        valueChange(event);
    };

    const handleCustomValueChange = (event) => {
        setCustomValue(event.target.value);
        valueChange(event.target.value);
    };

    const handleNextQuestion = (e) => {
        e.preventDefault();
        nextQuestion();

        console.log('Submitted: ', customValue);

        //find checked radio button
        const checkedRadio = document.querySelector('input[type="radio"]:checked');
        if (checkedRadio) {
            checkedRadio.checked = false;
        }
    };

    useEffect(() => {
        setCustomValue('');
    }, [currentQuestionIndex]);

    return (
        <form className="answers" onSubmit={handleNextQuestion}>
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
                    ref={inputRef}
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
                    ref={inputRef}
                />
            )}

            <div className="buttons">
                <MyButton color={color} onSubmit={handleNextQuestion}>
                    {currentQuestionIndex === questions.length - 1 ? 'Завершити опитування' : 'Наступне питання'}
                </MyButton>
            </div>
        </form>
    );
};

export default SurveyAnswers;
