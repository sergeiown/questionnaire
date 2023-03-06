import React, { useState } from 'react';
import MyInput from './UI/input/MyInput';
import Myselect from './UI/select/Myselect';
import MyButton from './UI/button/MyButton';
import DynamicOption from './PostOptions';

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: '', type: '', options: [], required: '' });

    const [options, setOptions] = useState([]);

    console.log(options);

    const createOptions = (newOptions) => {
        setOptions([...options, newOptions]);
        // setModal(false);
    };

    const addNewPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post,
            options: options,
            id: Date.now().toString(),
        };
        create(newPost);
        setPost({ title: '', type: '', options: [], required: '' });
        setOptions([]);
    };

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Текст питання..."
            />

            <Myselect
                value={post.required}
                onChange={(selectedReq) => setPost({ ...post, required: selectedReq })}
                defaultValue="Обов'язковість відповіді..."
                options={[
                    { value: 'true', name: 'так' },
                    { value: 'false', name: 'ні' },
                ]}
            />

            <Myselect
                value={post.type}
                onChange={(selectedType) => setPost({ ...post, type: selectedType })}
                defaultValue="Тип очікуваної відповіді..."
                options={[
                    { value: 'email', name: 'електронна пошта' },
                    { value: 'text', name: 'текст' },
                    { value: 'boolean', name: 'так або ні' },
                    { value: 'select', name: 'вибір варіанту' },
                ]}
            />

            <DynamicOption create={createOptions} />

            <MyButton onClick={addNewPost}>Створити питання</MyButton>
        </form>
    );
};

export default PostForm;
