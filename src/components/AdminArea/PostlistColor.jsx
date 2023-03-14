import React from 'react';
import MyColorPicker from '../UI/colorPicker/MyColorPicker';

const PostListColor = ({ color, setColor }) => {
    const handleColorChange = (e) => {
        setColor({ ...color, query: e.target.value });
        e.target.blur(); /* remove focus from input */
    };

    return (
        <div>
            <MyColorPicker value={color.query || color.new} onChange={handleColorChange} />
        </div>
    );
};

export default PostListColor;
