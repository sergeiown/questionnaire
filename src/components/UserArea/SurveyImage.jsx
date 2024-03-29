import React, { useEffect, useState } from 'react';
import ImageService from '../../API/ImageService';

const SurveyImage = ({ color }) => {
    const [imageUrl, setImageUrl] = useState('');

    const handleImageGet = async () => {
        const url = await ImageService.get();
        setImageUrl(url);
    };

    useEffect(() => {
        handleImageGet();
    }, []);

    return (
        <div className="imageWrapper" style={{ borderColor: color }}>
            {imageUrl ? <img src={imageUrl} alt="image" /> : <div></div>}
        </div>
    );
};

export default SurveyImage;
