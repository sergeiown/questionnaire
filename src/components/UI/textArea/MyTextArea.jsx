import React from 'react';
import classes from './MyTextArea.module.css';

const MyTextArea = React.forwardRef((props, ref) => {
    return <textarea ref={ref} {...props} className={classes.myText} />;
});

export default MyTextArea;
