import React, { useState, useEffect } from 'react';
import ColorService from '../../API/ColorService';
import SurveyImage from './SurveyImage';
import SurveyTitle from './SurveyTitle';
import SurveyQuestions from './SurveyQuestions';
import MyCopyright from '../UI/copyright/MyCopyright';

const UserArea = ({ onSaveAnswers }) => {
    const [color, setColor] = useState('');

    const fetchSavedColor = async () => {
        try {
            const color = await ColorService.get();
            setColor(color);
        } catch (e) {
            console.log(e);
        }
    };

    const handleSurveyQuestionsSubmit = (answers) => {
        onSaveAnswers(answers);
    };

    useEffect(() => {
        fetchSavedColor();
    }, []);

    return (
        <div className="userArea">
            {color && (
                <>
                    <SurveyImage color={color} />

                    <SurveyTitle />

                    <SurveyQuestions color={color} questionsSubmit={handleSurveyQuestionsSubmit} />

                    <MyCopyright />
                </>
            )}
        </div>
    );
};

export default UserArea;
