import React from 'react';
import RadioGroup from '../UI/RadioGroup/RadioGroup';
import MyInput from '../UI/input/MyInput';
import { useState, useRef, useEffect } from 'react';
import MyTextArea from '../UI/textArea/MyTextArea';

const SurveyAnswers = ({ quests, currentIndex, valueChange, required, color }) => {
    const questions = quests;
    const currentQuestionIndex = currentIndex;
    const inputRef = useRef(null);
    const [customValue, setCustomValue] = useState('');

    const handleCustomValueChange = (event) => {
        setCustomValue(event.target.value);
        valueChange(event.target.value);
    };

    useEffect(() => {
        setCustomValue('');
    }, [currentQuestionIndex]);

    return (
        <form className="answers">
            {(questions[currentQuestionIndex].type === 'boolean' ||
                questions[currentQuestionIndex].type === 'select') && (
                <RadioGroup
                    options={questions[currentQuestionIndex].options}
                    onChange={valueChange}
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
        </form>
    );
};

export default SurveyAnswers;
