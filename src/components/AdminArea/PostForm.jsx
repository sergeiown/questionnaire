import React, { useState } from 'react';
import MyTextArea from '../UI/textArea/MyTextArea';
import Myselect from '../UI/select/Myselect';
import MyButton from '../UI/button/MyButton';
import DynamicOption from './PostOptions';

const PostForm = ({ create }) => {
    const [post, setPost] = useState({ title: '', type: '', options: [], required: '' });

    const [options, setOptions] = useState([]);

    const [selected, setSelected] = useState('');

    const createOptions = (newOptions) => {
        setOptions([...options, newOptions]);
        setSelected('');
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
        <form onSubmit={addNewPost}>
            <MyTextArea
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                type="text"
                placeholder="Текст питання..."
                cols="55"
                rows="3"
                required
            />

            <Myselect
                value={post.required}
                onChange={(selectedReq) => setPost({ ...post, required: selectedReq })}
                defaultValue="Обов'язковість відповіді..."
                options={[
                    { value: 'true', name: 'так' },
                    { value: 'false', name: 'ні' },
                ]}
                required
            />

            <Myselect
                value={post.type}
                onChange={(selectedType) => {
                    setSelected(selectedType);
                    setPost({ ...post, type: selectedType });
                }}
                defaultValue="Тип очікуваної відповіді..."
                options={[
                    { value: 'email', name: 'електронна пошта' },
                    { value: 'text', name: 'текст' },
                    { value: 'boolean', name: 'так або ні' },
                    { value: 'select', name: 'вибір варіанту' },
                ]}
                required
            />

            {selected === 'select' && <DynamicOption create={createOptions} />}

            {(selected === 'select' && (
                <MyButton disabled={true} onSubmit={addNewPost}>
                    Створити питання
                </MyButton>
            )) || (
                <MyButton disabled={false} onSubmit={addNewPost}>
                    Створити питання
                </MyButton>
            )}
        </form>
    );
};

export default PostForm;
