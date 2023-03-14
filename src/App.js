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
    const [copied, setCopied] = useState(false);

    const handleSignIn = (user) => {
        setUser(user);
    };

    const handleSignOut = () => {
        setUser(null);
    };

    const handlePostListSave = () => {
        const currentUrl = window.location.href;
        navigator.clipboard.writeText(currentUrl).then(
            () => {
                console.log('Current URL is copied to the clipboard');
                setTimeout(() => {
                    setCopied(true);
                }, 1000);
                setTimeout(() => {
                    setCopied(false);
                }, 9000);
            },
            () => {
                console.error('Failed to copy current URL to clipboard');
            }
        );

        setUser(null);
        setActiveComponent('welcome');
    };

    const handleUserAreaClick = () => {
        setActiveComponent('userArea');
    };

    const handleModalClose = () => {
        setActiveComponent('welcome');
    };

    return (
        <div className="App">
            {activeComponent === 'welcome' && !user && (
                <div className="welcomeItems">
                    <MyButton onClick={handleUserAreaClick}>Пройти опитування</MyButton>
                    <MyButton onClick={() => setActiveComponent('modal')}>Вхід для адміністратора</MyButton>
                </div>
            )}

            {activeComponent === 'modal' && !user && (
                <MyModal visible={true} setVisible={handleModalClose}>
                    <div className="welcomeModal">
                        <MyAuth onSignIn={handleSignIn} onSignOut={handleSignOut} />
                    </div>
                </MyModal>
            )}

            {copied && activeComponent === 'welcome' && (
                <div className="message">Посилання на опитування скопійоване до буферу обміну</div>
            )}

            {user && <AdminArea onSave={handlePostListSave} currentEmail={user.email} />}

            {activeComponent === 'userArea' && <UserArea />}
        </div>
    );
}

export default App;
