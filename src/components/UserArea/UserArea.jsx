import React, { useState, useEffect } from 'react';
import ColorService from '../../API/ColorService';
import fileNameService from '../../API/fileNameService';
import SurveyImage from './SurveyImage';
import SurveyTitle from './SurveyTitle';
import SurveyQuestions from './SurveyQuestions';

const UserArea = ({ onSaveAnswers }) => {
    const [color, setColor] = useState('');
    const [fileName, setFileName] = useState('');

    const fetchSavedColor = async () => {
        try {
            const color = await ColorService.get();
            setColor(color);
        } catch (e) {
            console.log(e);
        }
    };

    const fetchSavedFileName = async () => {
        try {
            const fileName = await fileNameService.get();
            setFileName(fileName);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSurveyQuestionsSubmit = (answers) => {
        onSaveAnswers(fileName, answers);
    };

    useEffect(() => {
        fetchSavedColor();
        fetchSavedFileName();
    }, []);

    return (
        <div className="userArea">
            {color && (
                <>
                    <SurveyImage color={color} />

                    <SurveyTitle />

                    <SurveyQuestions color={color} questionsSubmit={handleSurveyQuestionsSubmit} />

                    <a
                        href="https://github.com/sergeiown/questionnaire/blob/main/LICENSE.md"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Copyright (c) 2023 Serhii I. Myshko
                    </a>
                </>
            )}
        </div>
    );
};

export default UserArea;
