import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
    return (
        <div className="post">
            <div className="post__content" id={props.id}>
                <strong>
                    <span style={{ color: '#6d6d6d' }}>{props.number}. </span>
                    {props.post.title}
                </strong>

                <div>
                    <span style={{ color: '#6d6d6d' }}>Обов'язкове:</span> {props.post.required}
                </div>

                <div>
                    <span style={{ color: '#6d6d6d' }}>Тип:</span> {props.post.type}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.remove(props.post)}>Видалити</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
