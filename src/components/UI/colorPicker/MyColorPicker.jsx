import React from 'react';
import classes from './MyColorPicker.module.css';

const MyColorPicker = React.forwardRef((props, ref) => {
    return <input type="color" ref={ref} {...props} className={classes.myColPicker} />;
});

MyColorPicker.displayName = 'MyColorPicker';

export default MyColorPicker;
