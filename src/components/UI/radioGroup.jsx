import React, { useState } from 'react';

const RadioGroup = ({ options, onChange, required }) => {
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

    return (
        <div>
            {options.map((option, index) => (
                <label key={index}>
                    <input
                        type="radio"
                        name="answer"
                        value={option}
                        onChange={handleOptionChange}
                        required={required}
                    />
                    {option === 'Власний варіант' ? (
                        <>
                            <span onClick={() => setShowCustomInput(!showCustomInput)}>{customValue || option}</span>
                            <input
                                type="text"
                                name="customAnswer"
                                value={customValue}
                                onChange={handleCustomValueChange}
                                placeholder="Введіть власний варіант"
                                style={{ display: showCustomInput ? 'block' : 'none' }}
                                required={showCustomInput || required}
                            />
                        </>
                    ) : (
                        <span>{option}</span>
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
