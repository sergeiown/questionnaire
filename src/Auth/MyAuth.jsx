// import React from 'react';
// import MyButton from '../components/UI/button/MyButton';
// import { useState, useEffect } from 'react';
// import firebase from 'firebase/app';
// import 'firebase/auth';

// const MyAuth = ({ onSignIn, onSignOut }) => {
//     const [user, setUser] = useState(null);

//     useEffect(() => {
//         const unregisterAuthObserver = firebase.auth().onAuthStateChanged((user) => {
//             setUser(user);
//             if (user) {
//                 onSignIn(user);
//             } else {
//                 onSignOut();
//             }
//         });
//         return () => unregisterAuthObserver();
//     }, [onSignIn, onSignOut]);

//     const handleSignIn = () => {
//         const provider = new firebase.auth.GoogleAuthProvider();
//         firebase.auth().signInWithPopup(provider);
//     };

//     const handleSignOut = () => {
//         firebase.auth().signOut();
//     };

//     return (
//         <div>
//             {!user ? (
//                 <MyButton onClick={handleSignIn}>Sign in with Google</MyButton>
//             ) : (
//                 <div>
//                     <MyButton onClick={handleSignIn}>Sign in with Google</MyButton>
//                     <p>You are signed in as {user.displayName}</p>
//                     <MyButton onClick={handleSignOut}>Sign out</MyButton>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MyAuth;

import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';

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
                <MyButton onClick={handleSignIn}>Sign in with Google</MyButton>
            ) : (
                <div>
                    {!confirmSignIn ? (
                        <>
                            <p>You are signed in as {user.displayName}</p>
                            <MyButton onClick={handleSignOut}>Sign out</MyButton>
                            <MyButton onClick={() => setConfirmSignIn(true)}>Confirm Sign In</MyButton>
                        </>
                    ) : (
                        <div>
                            <p>You are about to sign in as {user.displayName}. Do you want to continue?</p>
                            <MyButton
                                onClick={() => firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())}
                            >
                                Continue
                            </MyButton>
                            <MyButton onClick={() => setConfirmSignIn(false)}>Cancel</MyButton>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MyAuth;
