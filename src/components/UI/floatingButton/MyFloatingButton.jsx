import React, { useState, useEffect } from 'react';
import classes from './MyFloatingButton.module.css';

const MyFloatingButton = ({ children, ...props }) => {
    const [isMyFloatingButtonVisible, setIsMyFloatingButtonVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                setIsMyFloatingButtonVisible(true);
            } else {
                setIsMyFloatingButtonVisible(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <React.Fragment>
            {isMyFloatingButtonVisible && (
                <button {...props} className={classes.myFloatingBtn}>
                    {children}
                </button>
            )}
        </React.Fragment>
    );
};

export default MyFloatingButton;
