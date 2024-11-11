import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import backimg from '../../assets/images/backimg.svg';
import textImage from '../../assets/images/textpg.png';
import { logIn, signUp } from '../../firebase/services/authService.js';
import useAuth from '../../hooks/useAuth';
import styles from './Auth.css';

const Auth = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await signUp(email, password);
            console.log('Sign up successful');
            setEmail('');
            setPassword('');
            setError('');
        } catch (error) {
            setError(error.message);
            console.error('Sign up error:', error);
        }
    };

    const handleLogIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await logIn(email, password);
            const userData = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
            };
            console.log('Login successful, user:', userData);
            setError('');
            setEmail('');
            setPassword('');
            navigate('/profile', { state: { user: userData } });
        } catch (error_) {
            setError(error_.message);
            console.error('Login error:', error_);
        }
    };

    return (
        <div className={styles.maincont} style={{ backgroundImage: `url(${backimg})` }}>
            <div className={styles.authform}>
                <form>
                    <div className={styles.top__container}>
                        <div>
                            <h1 className={styles.c}>Будь в потоці</h1>
                            <input
                                type="email"
                                placeholder="Email..."
                                className={styles.inputc}
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password..."
                                className={styles.inputc}
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                required
                            />
                        </div>
                        <button onClick={handleSignUp} className={styles.buttc}>
                            Зареєструватися
                        </button>
                    </div>

                    <div className={styles.bottom__container}>
                        <h2 className={styles.c2}>Уже зареєстровані?</h2>
                        <button onClick={handleLogIn} className={styles.buttc}>
                            Ввійти
                        </button>
                    </div>
                    {error && <p className={styles.error}>{error}</p>}
                </form>
            </div>

            <div className={styles.textimage}>
                <img src={textImage} alt="text-image" className={styles.textim} />
            </div>
        </div>
    );
};
export default Auth;
