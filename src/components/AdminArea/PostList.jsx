import React from 'react';
import ImageChanger from './PostListImage.jsx';
import PostItem from './PostItem.jsx';
import MyCopyright from '../UI/copyright/MyCopyright.jsx';

const PostList = ({ postListTitle, title, posts, moveUp, remove, moveDown, baseImage, color }) => {
    const mainTitle = postListTitle.query || postListTitle.new;

    if (!posts.length) {
        return (
            <div className="postList">
                <ImageChanger baseImage={baseImage} color={color} />

                <div className="titleWrapper">
                    <h1>{mainTitle}</h1>
                </div>

                <h2>Питання не знайдені...</h2>

                <MyCopyright />
            </div>
        );
    }

    return (
        <div className="postList">
            <ImageChanger baseImage={baseImage} color={color} />

            <div className="titleWrapper">
                <h1>{mainTitle}</h1>
            </div>

            <h2>{title}</h2>

            {posts.map((post, index) => (
                <PostItem
                    key={post.id}
                    id={post.id}
                    moveUp={moveUp}
                    remove={remove}
                    moveDown={moveDown}
                    index={index}
                    length={posts.length}
                    number={index + 1}
                    post={post}
                    color={color}
                />
            ))}

            <MyCopyright />
        </div>
    );
};

export default PostList;
