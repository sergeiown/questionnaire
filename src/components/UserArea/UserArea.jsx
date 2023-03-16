import React from 'react';
import UserImage from './UserImage';

const UserArea = () => {
    return (
        <div className="userArea">
            <UserImage />

            <a href="https://github.com/sergeiown/questionnaire/blob/main/LICENSE.md" target="_blank" rel="noreferrer">
                Copyright (c) 2023 Serhii I. Myshko
            </a>
        </div>
    );
};

export default UserArea;
