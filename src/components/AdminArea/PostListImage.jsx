import React, { useState } from 'react';
import ImageService from '../../API/ImageService';

const ImageChanger = ({ baseImage }) => {
    const [imageUrl, setImageUrl] = useState(null);

    const handleClick = () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = handleImageUpload;
        fileInput.click();
    };

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        const url = await ImageService.upload(file);
        setImageUrl(url);
    };

    const handleBaseImageGet = async () => {
        const url = await ImageService.getBase();
        setImageUrl(url);
    };

    const handleSavedImageGet = async () => {
        const url = await ImageService.get();
        setImageUrl(url);
    };

    if (!imageUrl) {
        if (baseImage) {
            handleBaseImageGet();
        } else {
            handleSavedImageGet();
        }
    }

    return (
        <div onClick={handleClick} className="postListImage">
            {imageUrl ? <img src={imageUrl} alt="image" /> : <div></div>}
        </div>
    );
};

export default ImageChanger;
