import React from 'react';
import './styles/App.css';
import { useState } from 'react';
import MyAuth from './Auth/MyAuth';
import MyButton from './components/UI/button/MyButton';
import MyModal from './components/UI/MyModal/MyModal';
import AdminArea from './components/AdminArea/AdminArea';
import UserArea from './components/UserArea/UserArea';

function App() {
    const [user, setUser] = useState(null);
    const [activeComponent, setActiveComponent] = useState('welcome');

    const handleSignIn = (user) => {
        setUser(user);
    };

    const handleSignOut = () => {
        setUser(null);
    };

    const handleUserAreaClick = () => {
        setActiveComponent('userArea');
    };

    const handleModalClose = () => {
        setActiveComponent('welcome');
    };

    return (
        <div className="App">
            {activeComponent === 'welcome' && (
                <div className="welcomeButtons">
                    <MyButton onClick={handleUserAreaClick}>Пройти опитування</MyButton>
                    <MyButton onClick={() => setActiveComponent('modal')}>Вхід для адміністратора</MyButton>
                </div>
            )}

            {activeComponent === 'modal' && (
                <MyModal visible={true} setVisible={handleModalClose}>
                    <div className="welcomeModal">
                        <MyAuth onSignIn={handleSignIn} onSignOut={handleSignOut} />
                    </div>
                </MyModal>
            )}

            {user && <AdminArea />}
            {activeComponent === 'userArea' && <UserArea />}
        </div>
    );
}

export default App;
