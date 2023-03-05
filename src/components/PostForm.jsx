import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import MyButton from './UI/button/MyButton';

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: '', body: '' });

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post,
            id: Date.now().toString(),
        };
        create(newPost);
        setPost({ title: '', body: '' });
    };

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Текст питання..."
            />

            <MyInput
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                type="text"
                placeholder="Тип питання..."
            />

            <MyButton onClick={addNewPost}>Створити питання</MyButton>
        </form>
    );
};

export default PostForm;
