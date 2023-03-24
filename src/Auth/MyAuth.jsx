import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import db from '../API/FirebaseConfig';
import { auth } from '../API/FirebaseConfig';

const MyAuth = ({ onSignIn, onSignOut }) => {
    const [user, setUser] = useState(null);
    const [confirmSignIn, setConfirmSignIn] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unregisterAuthObserver = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user && confirmSignIn) {
                onSignIn(user);
            } else if (!user) {
                onSignOut();
                setConfirmSignIn(false);
            }
        });
        return () => unregisterAuthObserver();
    }, [onSignIn, onSignOut, confirmSignIn]);

    /* Check Firebase user role ! */
    useEffect(() => {
        if (user) {
            db.collection('Users')
                .doc(user.email)
                .get()
                .then((doc) => {
                    if (doc.exists) {
                        const role = doc.data().role;
                        console.log('Welcome, ' + role + '!');
                        if (role !== 'Firebase Admin' && role !== 'Owner') {
                            console.log('Access denied!');
                            setError(`Користувачу ${user.displayName} доступ не дозволено!`);
                            setUser(null);
                        }
                    } else {
                        console.log('Access denied!');
                        setError(`Користувач ${user.displayName} не має прав доступу!`);
                        setTimeout(() => {
                            setError(null);
                        }, 5000);

                        setUser(null);
                    }
                })
                .catch((error) => console.log(error));
        }
    }, [user]);

    const handleSignIn = () => {
        if (user) {
            setConfirmSignIn(true);
        } else {
            const provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
            provider.addScope('https://www.googleapis.com/auth/userinfo.email');
            auth.useDeviceLanguage();
            auth.signInWithPopup(provider)
                .then(() => {
                    console.log('Sign in successful!');
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    };

    const handleSignOut = () => {
        auth.signOut();
    };

    return (
        <div>
            {!user ? (
                <>
                    <MyButton onClick={handleSignIn}>Увійти з обліковим записом Google</MyButton>
                    {error && <h2>{error}</h2>}
                </>
            ) : (
                <>
                    {!confirmSignIn && (
                        <div className="myAuthContent">
                            <p>Ви увійшли як</p>
                            <p>
                                <strong>{user.displayName}</strong>
                            </p>
                            <img src={user.photoURL} alt="avatar" />
                            <p>
                                {' '}
                                <strong>{user.email}</strong>{' '}
                            </p>

                            <div>
                                <MyButton onClick={handleSignOut}>Вийти</MyButton>
                                <MyButton onClick={() => setConfirmSignIn(true)}>Продовжити</MyButton>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default MyAuth;
