import React from 'react';
import MyColorPicker from '../UI/colorPicker/MyColorPicker';

const PostListColor = ({ color, setColor }) => {
    return (
        <div>
            <MyColorPicker
                value={color.query || color.new}
                onInput={(e) => setColor({ ...color, query: e.target.value })}
            />
        </div>
    );
};

export default PostListColor;
