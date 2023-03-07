import React from 'react';
import classes from './MyFloatingButton.module.css';

const MyFloatingButton = ({ children, ...props }) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyFloatingButton;
