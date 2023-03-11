import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import db from '../API/FirebaseConfig';

const MyAuth = ({ onSignIn, onSignOut }) => {
    const [user, setUser] = useState(null);
    const [confirmSignIn, setConfirmSignIn] = useState(false);

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
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
                            setUser(null);
                        }
                    } else {
                        console.log('Access denied!');
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
            firebase.auth().signInWithPopup(provider);
        }
    };

    const handleSignOut = () => {
        firebase.auth().signOut();
    };

    return (
        <div>
            {!user ? (
                <>
                    <MyButton onClick={handleSignIn}>Увійти з обліковим записом Google</MyButton>
                </>
            ) : (
                <div>
                    {!confirmSignIn && (
                        <>
                            <p>You are signed in as {user.displayName}</p>
                            <MyButton onClick={handleSignOut}>Sign out</MyButton>
                            <MyButton onClick={() => setConfirmSignIn(true)}>Confirm Sign In</MyButton>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyAuth;
