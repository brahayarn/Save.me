import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyBs7B6Yz5Xb4Dk2ttDcrmLhEgyE8qIQbo4',
    authDomain: 'intrest-64852.firebaseapp.com',
    projectId: 'intrest-64852',
    storageBucket: 'intrest-64852.appspot.com',
    messagingSenderId: '787261982573',
    appId: '1:787261982573:web:f462d9d7e52efc00ddbc64',
    measurementId: 'G-GVPQ2SFFYV',
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);
