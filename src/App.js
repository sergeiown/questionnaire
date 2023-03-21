import React from 'react';
import { writeText } from 'clipboard-polyfill';
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
    const [visible, setVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [goodBye, setGoodBye] = useState(false);

    const handleSignIn = (user) => {
        setUser(user);
    };

    const handleSignOut = () => {
        setUser(null);
    };

    const handlePostListSave = (fileName, questions) => {
        console.log(fileName);
        console.log(questions);

        const currentUrl = window.location.href;
        writeText(currentUrl).then(
            () => {
                console.log('Current URL is copied to the clipboard');
                setCopied(true);
                setVisible(true);
                setTimeout(() => {
                    setVisible(false);
                    setCopied(false);
                }, 10000);
            },
            () => {
                console.error('Failed to copy current URL to clipboard');
            }
        );

        setUser(null);
        setActiveComponent('welcome');
    };

    const handleAnswersSave = (answers) => {
        console.log(answers);

        setGoodBye(true);
        setVisible(true);
        setTimeout(() => {
            setVisible(false);
            setGoodBye(false);
        }, 10000);

        setActiveComponent('welcome');
    };

    const handleUserAreaClick = () => {
        setActiveComponent('userArea');
    };

    const handleModalClose = () => {
        setVisible(false);
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

            {user && <AdminArea onSave={handlePostListSave} currentEmail={user.email} />}

            {copied && activeComponent === 'welcome' && (
                <MyModal visible={visible} setVisible={handleModalClose}>
                    <h2>Посилання на опитування скопійоване до буферу обміну.</h2>
                </MyModal>
            )}

            {activeComponent === 'userArea' && <UserArea onSaveAnswers={handleAnswersSave} />}

            {goodBye && activeComponent === 'welcome' && (
                <MyModal visible={visible} setVisible={handleModalClose}>
                    <h2>Щиро дякуємо за участь в опитуванні!</h2>
                </MyModal>
            )}
        </div>
    );
}

export default App;
