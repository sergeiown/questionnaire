import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({ children, color, ...props }) => {
    const buttonStyle = {
        color: color,
        borderColor: color,
    };

    return (
        <button {...props} className={classes.myBtn} style={buttonStyle}>
            {children}
        </button>
    );
};

export default MyButton;
