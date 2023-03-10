import React from 'react';
import classes from './Myselect.module.css';

const Myselect = ({ options, defaultValue, value, onChange, required }) => {
    return (
        <select
            required={required}
            className={classes.mySelect}
            value={value}
            onChange={(event) => onChange(event.target.value)}
        >
            <option disabled value="">
                {defaultValue}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
};

export default Myselect;
