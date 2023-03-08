import React from 'react';
import PostItem from './PostItem.jsx';

const PostList = ({ posts, title, remove }) => {
    if (!posts.length) {
        return (
            <div className="postList">
                <h1>Питання не знайдені...</h1>
            </div>
        );
    }

    // console.clear();
    // console.table(posts);

    return (
        <div className="postList">
            <h1>{title}</h1>

            {posts.map((post, index) => (
                <PostItem key={post.id} id={post.id} remove={remove} number={index + 1} post={post} />
            ))}
        </div>
    );
};

export default PostList;
