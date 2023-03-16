import React from 'react';
import SurveyImage from './SurveyImage';
import SurveyTitle from './SurveyTitle';
import SurveyQuestions from './SurveyQuestions';

const UserArea = () => {
    return (
        <div className="userArea">
            <SurveyImage />

            <SurveyTitle />

            <SurveyQuestions />

            <a href="https://github.com/sergeiown/questionnaire/blob/main/LICENSE.md" target="_blank" rel="noreferrer">
                Copyright (c) 2023 Serhii I. Myshko
            </a>
        </div>
    );
};

export default UserArea;
