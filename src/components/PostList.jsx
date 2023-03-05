import React from 'react';
import PostItem from './PostItem.jsx';

const PostList = ({ posts, title, remove }) => {
    if (!posts.length) {
        return <h1 style={{ textAlign: 'center' }}>No posts found!</h1>;
    }

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
