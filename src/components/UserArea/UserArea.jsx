import React, { useState, useEffect } from 'react';
import ColorService from '../../API/ColorService';
import SurveyImage from './SurveyImage';
import SurveyTitle from './SurveyTitle';
import SurveyQuestions from './SurveyQuestions';

const UserArea = () => {
    const [color, setColor] = useState('');

    const fetchSavedColor = async () => {
        const savedColor = localStorage.getItem('color');
        if (savedColor) {
            setColor(JSON.parse(savedColor));
        } else {
            const color = await ColorService.get();
            setColor(color);
            localStorage.setItem('color', JSON.stringify(color));
        }
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

                    <SurveyQuestions color={color} />

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
