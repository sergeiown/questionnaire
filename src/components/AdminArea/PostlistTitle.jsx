import React from 'react';
import MyInput from '../UI/input/MyInput';

const PostListTitle = ({ title, setTitle }) => {
    return (
        <div>
            <MyInput
                type="text"
                maxlength="180"
                value={title.query}
                onChange={(e) => setTitle({ ...title, query: e.target.value })}
                placeholder="Заголовок опитування..."
            />
        </div>
    );
};

export default PostListTitle;
