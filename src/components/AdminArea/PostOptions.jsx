import React, { useState } from 'react';
import MyInput from '../UI/input/MyInput';
import MyButton from '../UI/button/MyButton';

function DynamicOption({ create }) {
    const [options, setOptions] = useState([]);

    const addInput = (click) => {
        click.preventDefault();
        setOptions([...options, '']);

        /* scroll to the bottom */
        const element = document.getElementById('bottomOptionsButton');
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    const deleteInput = (index) => {
        const newOptions = [...options];
        newOptions.splice(index, 1);
        setOptions(newOptions);
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
        setOptions([]);
    };

    return (
        <div>
            {options.map((input, index) => (
                <div key={index}>
                    <MyInput
                        key={index}
                        number={index + 1}
                        value={input}
                        type="text"
                        placeholder="Текст варіанту відповіді..."
                        onChange={(event) => handleInputChange(index, event.target.value)}
                        required
                    />

                    <MyButton onClick={() => deleteInput(index)}>Видалити</MyButton>
                </div>
            ))}

            <div>
                <MyButton onClick={addInput} id="bottomOptionsButton">
                    Додати варіант
                </MyButton>
                <MyButton onClick={addNewOptions}>Зберегти варіанти</MyButton>
            </div>
        </div>
    );
}

export default DynamicOption;
