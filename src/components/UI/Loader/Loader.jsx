import React from 'react';
import preloader from '../../../assets/images/preloader.svg';
import cl from './Loader.module.css';

const Loader = () => {
    return <img className={cl.loader} src={preloader} alt="Loading..." />;
};

export default Loader;
