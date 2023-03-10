import React from 'react';
import ImageChanger from './PostListImage.jsx';
import PostItem from './PostItem.jsx';

const PostList = ({ postListTitle, title, posts, remove, baseImage }) => {
    const mainTitle = postListTitle.query || postListTitle.new;

    if (!posts.length) {
        return (
            <div className="postList">
                <h1>{mainTitle}</h1>
                <h2>Питання не знайдені...</h2>
            </div>
        );
    }

    // console.clear();
    // console.table(posts);

    return (
        <div className="postList">
            <ImageChanger baseImage={baseImage} />

            <h1>{mainTitle}</h1>

            <h2>{title}</h2>

            {posts.map((post, index) => (
                <PostItem key={post.id} id={post.id} remove={remove} number={index + 1} post={post} />
            ))}

            <a href="https://github.com/sergeiown/questionnaire/blob/main/LICENSE.md" target="_blank" rel="noreferrer">
                Copyright (c) 2023 Serhii I. Myshko
            </a>
        </div>
    );
};

export default PostList;
