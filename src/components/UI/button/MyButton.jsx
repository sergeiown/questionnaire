import React from 'react';
import classes from './MyButton.module.css';

const MyButton = ({ children, color = '#ff7f50', ...props }) => {
    const buttonStyle = {
        color: color,
        borderColor: shadeColor(color, 20),
        backgroundColor: shadeColor(color, 65),
    };

    return (
        <button {...props} className={classes.myBtn} style={buttonStyle}>
            {children}
        </button>
    );
};

export default MyButton;

function shadeColor(color, percent) {
    const hex = color.slice(1);
    const R = parseInt(hex.slice(0, 2), 16);
    const G = parseInt(hex.slice(2, 4), 16);
    const B = parseInt(hex.slice(4, 6), 16);
    const shadeAmount = Math.round(2.55 * percent);
    const newR = Math.max(Math.min(R - shadeAmount, 255), 0);
    const newG = Math.max(Math.min(G - shadeAmount, 255), 0);
    const newB = Math.max(Math.min(B - shadeAmount, 255), 0);
    return `rgb(${newR}, ${newG}, ${newB})`;
}
