import React from 'react';
import MyInput from '../UI/input/MyInput';

const PostListEmail = ({ email, setEmail }) => {
    return (
        <div>
            <MyInput
                value={email.query}
                onChange={(e) => setEmail({ ...email, query: e.target.value })}
                placeholder={email.new}
            />
        </div>
    );
};

export default PostListEmail;
