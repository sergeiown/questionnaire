import React from 'react';
import MyModal from '../UI/MyModal/MyModal';
import FileList from './FileList';
import MyButton from '../UI/button/MyButton';
import { useState } from 'react';

const FileManager = ({ onExit, onGoOn }) => {
    const [visible, setVisible] = useState(true);

    const handleModalCloseOnExit = () => {
        setVisible(false);
        onExit();
    };

    const handleModalCloseOnGoOn = () => {
        setVisible(false);
        onGoOn();
    };

    return (
        <MyModal visible={visible} setVisible={handleModalCloseOnExit}>
            <div className="fileManager">
                <h2>Результати опитувань:</h2>

                <FileList />

                <div className="buttons">
                    <MyButton onClick={handleModalCloseOnExit}>Вийти з перегляду результатів</MyButton>
                    <MyButton onClick={handleModalCloseOnGoOn}>До створення нового опитування</MyButton>
                </div>
            </div>
        </MyModal>
    );
};

export default FileManager;
