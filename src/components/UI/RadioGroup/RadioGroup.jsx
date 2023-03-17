import React, { useState } from 'react';
import classes from './RadioGroup.module.css';
import MyTextArea from '../textArea/MyTextArea';

const RadioGroup = ({ options, onChange, required, color = '#ff7f50' }) => {
    const [showCustomInput, setShowCustomInput] = useState(false);
    const [customValue, setCustomValue] = useState('');

    const handleCustomValueChange = (event) => {
        setCustomValue(event.target.value);
        onChange(event.target.value);
    };

    const handleOptionChange = (event) => {
        const selectedOption = event.target.value;
        setCustomValue('');
        onChange(selectedOption);
        setShowCustomInput(selectedOption === 'Власний варіант');
    };

    const scrollToTextArea = () => {
        setShowCustomInput(true);

        setTimeout(() => {
            const textarea = document.querySelector('textarea');
            textarea.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 500);
    };

    const scrollToInput = () => {
        //scroll to selected input without timeout
        const input = document.querySelector('input:checked');
        input.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    return (
        <div className={classes.radioGroup}>
            {options.map((option, index) => (
                <label key={index}>
                    {option === 'Власний варіант' ? (
                        <>
                            <input
                                onClick={() => scrollToTextArea()}
                                type="radio"
                                name="answer"
                                value={option}
                                onChange={handleOptionChange}
                                required={required}
                                style={{ accentColor: color }}
                            />
                            <span onClick={() => scrollToTextArea()}>{option}</span>
                            <MyTextArea
                                value={customValue}
                                onChange={handleCustomValueChange}
                                type="text"
                                placeholder="Введіть власний варіант..."
                                cols="55"
                                rows="3"
                                style={{
                                    display: showCustomInput ? 'flex' : 'none',
                                    borderColor: customValue && customValue.length > 0 ? color : '#800000ff',
                                }}
                                required={showCustomInput || required}
                            />
                        </>
                    ) : (
                        <>
                            <input
                                onClick={() => scrollToInput()}
                                type="radio"
                                name="answer"
                                value={option}
                                onChange={handleOptionChange}
                                required={required}
                                style={{ accentColor: color }}
                            />
                            <span onClick={() => scrollToInput()}>{option}</span>
                        </>
                    )}
                </label>
            ))}
        </div>
    );
};

export default RadioGroup;

/* 
const options = ['Вариант 1', 'Вариант 2', 'Власний варіант'];
const handleValueChange = (newValue) => {
    console.log(newValue);
};

<RadioGroup options={options} onChange={handleValueChange} required />
*/
