import React from 'react';
import ImageChanger from './PostListImage.jsx';
import PostItem from './PostItem.jsx';
import { useEffect } from 'react';

const PostList = ({ postListTitle, title, posts, remove, baseImage, color }) => {
    const mainTitle = postListTitle.query || postListTitle.new;

    const adjustFontSize = () => {
        const titleWrapper = document.querySelector('.titleWrapper');
        const title = document.querySelector('.titleWrapper h1');
        const titleWrapperWidth = titleWrapper.offsetWidth;
        const titleWidth = title.offsetWidth;
        const fontSize = (titleWrapperWidth / titleWidth) * 100;
        title.style.fontSize = fontSize + '%';
    };

    useEffect(() => {
        adjustFontSize();
        window.addEventListener('resize', adjustFontSize);
        return () => {
            window.removeEventListener('resize', adjustFontSize);
        };
    }, [mainTitle]);

    if (!posts.length) {
        return (
            <div className="postList">
                <ImageChanger baseImage={baseImage} color={color} />

                <div className="titleWrapper">
                    <h1>{mainTitle}</h1>
                </div>

                <h2>Питання не знайдені...</h2>

                <a
                    href="https://github.com/sergeiown/questionnaire/blob/main/LICENSE.md"
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginTop: '6rem' }}
                >
                    Copyright (c) 2023 Serhii I. Myshko
                </a>
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
                <PostItem key={post.id} id={post.id} remove={remove} number={index + 1} post={post} color={color} />
            ))}

            <a href="https://github.com/sergeiown/questionnaire/blob/main/LICENSE.md" target="_blank" rel="noreferrer">
                Copyright (c) 2023 Serhii I. Myshko
            </a>
        </div>
    );
};

export default PostList;
