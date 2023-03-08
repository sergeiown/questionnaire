/*  Use your own information for the configuration. 
    The correct structure of the configuration file is shown below. */

import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: '',
    authDomain: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: '',
    measurementId: '',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export default db;
