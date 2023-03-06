import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

function DynamicOption({ create }) {
    const [options, setOptions] = useState(['']);

    const addInput = (click) => {
        click.preventDefault();
        setOptions([...options, '']);
    };

    const handleInputChange = (index, value) => {
        const newOptions = [...options];
        newOptions[index] = value;
        setOptions(newOptions);
    };

    const addNewOptions = (click) => {
        click.preventDefault();
        const newOptions = [...options, 'Власний варіант'];
        create(newOptions);
        setOptions(['']);
    };

    return (
        <div>
            {options.map((input, index) => (
                <MyInput
                    key={index}
                    number={index + 1}
                    value={input}
                    type="text"
                    placeholder="Текст варіанту відповіді..."
                    onChange={(event) => handleInputChange(index, event.target.value)}
                />
            ))}
            <MyButton onClick={addInput}>Додати варіант</MyButton>

            <MyButton onClick={addNewOptions}>Зберегти</MyButton>
        </div>
    );
}

export default DynamicOption;
