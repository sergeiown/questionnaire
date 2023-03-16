import React, { useState } from 'react';

import ImageService from '../../API/ImageService';

const UserImage = () => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleImageGet = async () => {
        const url = await ImageService.get();
        setImageUrl(url);
    };

    if (!imageUrl) {
        handleImageGet();
    }

    return <div className="imageWrapper">{imageUrl ? <img src={imageUrl} alt="image" /> : <div></div>}</div>;
};

export default UserImage;
