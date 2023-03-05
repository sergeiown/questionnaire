import React from 'react';
import MyButton from './UI/button/MyButton';

const PostItem = (props) => {
    return (
        <div className="post">
            <div className="post__content" id={props.id}>
                <strong>
                    {props.number}. {props.post.title}
                </strong>
                <div>Тип: {props.post.body}</div>
            </div>
            <div className="post__btns">
                <MyButton onClick={() => props.remove(props.post)}>Видалити</MyButton>
            </div>
        </div>
    );
};

export default PostItem;
