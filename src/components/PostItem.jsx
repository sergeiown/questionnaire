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

                {/* Show post.options */}
                {props.post.options.length > 0 && (
                    <div>
                        <span style={{ color: '#6d6d6d' }}>Варіанти відповідей:</span>
                        <ul className="optionsList">
                            {props.post.options[0].map((option, index) => (
                                <li key={index}>
                                    <span style={{ color: '#6d6d6d' }}>{index + 1}. </span>
                                    {option}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div>
                    <span style={{ color: '#6d6d6d' }}>Питання обов&apos;язкове:</span> {props.post.required}
                </div>

                <div>
                    <span style={{ color: '#6d6d6d' }}>Тип питання:</span> {props.post.type}
                </div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.remove(props.post)}>Видалити</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
