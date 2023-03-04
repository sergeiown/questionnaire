import React from 'react';

const Question = ({ question, type, options, onUpdateQuestion, onUpdateType, onUpdateOptions }) => {
    const handleQuestionChange = (e) => {
        onUpdateQuestion(e.target.value);
    };

    const handleTypeChange = (e) => {
        onUpdateType(e.target.value);
    };

    const handleOptionsChange = (e) => {
        onUpdateOptions(e.target.value);
    };

    return (
        <div>
            <label>Question:</label>
            <input type="text" value={question} onChange={handleQuestionChange} />
            <br />

            <label>Type:</label>
            <select value={type} onChange={handleTypeChange}>
                <option value="text">Text</option>
                <option value="yesNo">Yes/No</option>
                <option value="select">Select</option>
            </select>
            <br />

            {type === 'select' && (
                <>
                    <label>Options (comma separated):</label>
                    <input type="text" value={options} onChange={handleOptionsChange} />
                    <br />
                </>
            )}
        </div>
    );
};

export default Question;
