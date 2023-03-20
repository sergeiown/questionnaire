import React from 'react';
import TitleService from '../../API/TitleService';
import { useEffect, useState } from 'react';

const SurveyTitle = () => {
    const [title, setTitle] = useState('');

    const fetchSavedTitle = async () => {
        const title = await TitleService.get();
        setTitle(title);
    };

    useEffect(() => {
        fetchSavedTitle();
    }, []);

    return <div className="titleWrapper">{title ? <h1>{title}</h1> : <h1></h1>}</div>;
};

export default SurveyTitle;
