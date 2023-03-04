import React from 'react';

const Question = ({ onSubmit }) => {
    const [question, setQuestion] = React.useState('');
    const [type, setType] = React.useState('text');
    const [options, setOptions] = React.useState([]);

    const handleQuestionChange = (event) => {
        setQuestion(event.target.value);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value);
    };

    const handleOptionChange = (event, index) => {
        const newOptions = [...options];
        newOptions[index] = event.target.value;
        setOptions(newOptions);
    };

    const handleAddOption = () => {
        setOptions([...options, '']);
    };

    const handleSubmit = () => {
        onSubmit({ question, type, options });
        setQuestion('');
        setType('text');
        setOptions([]);
    };

    return (
        <div>
            <label>
                Вопрос:
                <input type="text" value={question} onChange={handleQuestionChange} />
            </label>
            <label>
                Тип вопроса:
                <select value={type} onChange={handleTypeChange}>
                    <option value="text">Обычный</option>
                    <option value="yesno">Да/нет</option>
                    <option value="choice">Выбор</option>
                </select>
            </label>
            {type === 'choice' && (
                <div>
                    {options.map((option, index) => (
                        <label key={index}>
                            Вариант ответа #{index + 1}:
                            <input type="text" value={option} onChange={(event) => handleOptionChange(event, index)} />
                        </label>
                    ))}
                    <button onClick={handleAddOption}>Добавить вариант ответа</button>
                </div>
            )}
            <button onClick={handleSubmit}>Добавить вопрос</button>
        </div>
    );
};

export default Question;
