import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

import { auth } from '../config';
import { validateGmail } from '../services/validation/gmailValidation';
import { validatePassword } from '../services/validation/passwordValidation';

export const signUp = async (email, password) => {
    const emailError = validateGmail(email);
    if (emailError) {
        throw new Error(emailError);
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        throw new Error(passwordError);
    }

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = async (email, password) => {
    const emailError = validateGmail(email);
    if (emailError) {
        throw new Error(emailError);
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
        throw new Error(passwordError);
    }

    return await signInWithEmailAndPassword(auth, email, password);
};

export const logOut = async () => {
    return await signOut(auth);
};
