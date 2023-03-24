import React from 'react';
import classes from './MyCopyright.module.css';

const MyCopyright = () => {
    return (
        <a
            className={classes.myCopyright}
            href="https://github.com/sergeiown/questionnaire/blob/main/LICENSE.md"
            target="_blank"
            rel="noreferrer"
            style={{ color: '#ff7f50' }}
        >
            Copyright (c) 2023 Serhii I. Myshko
        </a>
    );
};

export default MyCopyright;
