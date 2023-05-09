import React from 'react';
import MyButton from '../UI/button/MyButton';

const PostItem = (props) => {
    return (
        <div className="post" style={{ borderColor: props.color }}>
            <div className="post__content" id={props.id}>
                <strong>
                    <span style={{ color: '#6d6d6d' }}>{props.number}. </span>
                    <h3>{props.post.title}</h3>
                </strong>

                {/* Show post.options */}
                {props.post.options.length > 0 && (
                    <div className="options">
                        <span style={{ color: '#6d6d6d' }}>Варіанти відповідей:</span>
                        <ul className="optionsList">
                            {props.post.options.map((option, index) => (
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
                {props.index === 0 && (
                    <MyButton onClick={() => props.moveUp(props.index)} color={props.color} title="Вгору" disabled>
                        up
                    </MyButton>
                )}
                {props.index > 0 && (
                    <MyButton onClick={() => props.moveUp(props.index)} color={props.color} title="Вгору">
                        up
                    </MyButton>
                )}
                <MyButton onClick={() => props.remove(props.post)} color={props.color} title="Видалити">
                    &#9940;
                </MyButton>
                {props.index === props.length - 1 && (
                    <MyButton onClick={() => props.moveDown(props.index)} color={props.color} title="Вниз" disabled>
                        down
                    </MyButton>
                )}
                {props.index < props.length - 1 && (
                    <MyButton onClick={() => props.moveDown(props.index)} color={props.color} title="Вниз">
                        down
                    </MyButton>
                )}
            </div>
        </div>
    );
};

export default PostItem;
