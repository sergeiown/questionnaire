import React from 'react';
import TitleService from '../../API/TitleService';
import { useEffect, useState } from 'react';

const SurveyTitle = () => {
    const [title, setTitle] = useState('');

    const fetchSavedTitle = async () => {
        const title = await TitleService.get();
        setTitle(title);
    };

    const adjustFontSize = () => {
        const titleWrapper = document.querySelector('.titleWrapper');
        const title = document.querySelector('.titleWrapper h1');
        const titleWrapperWidth = titleWrapper.offsetWidth;
        const titleWidth = title.offsetWidth;
        const fontSize = (titleWrapperWidth / titleWidth) * 100;
        title.style.fontSize = fontSize + '%';
    };

    useEffect(() => {
        fetchSavedTitle();
    }, []);

    useEffect(() => {
        adjustFontSize();
        window.addEventListener('resize', adjustFontSize);
        return () => {
            window.removeEventListener('resize', adjustFontSize);
        };
    }, [title]);

    return <div className="titleWrapper">{title ? <h1>{title}</h1> : <h1></h1>}</div>;
};

export default SurveyTitle;
