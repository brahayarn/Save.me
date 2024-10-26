import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../firebaseConfig';
import { validatePassword } from './passwordValidation';

export const signUp = async (email, password) => {
    const passwordError = validatePassword(password);
    if (passwordError) {
        throw new Error(passwordError);
    }

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = async (email, password) => {
    const passwordError = validatePassword(password);
    if (passwordError) {
        throw new Error(passwordError);
    }

    return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
    return await signOut(auth);
};
