import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import backimg from '../../assets/images/backimg.svg';
import textImage from '../../assets/images/textpg.png';
import { logIn, signUp } from '../../firebase/services/authService';
import useAuth from '../../hooks/useAuth';
import styles from './Auth.css';

const Auth = () => {
    useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        try {
            await signUp(email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogIn = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await logIn(email, password);
            const user = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
            };
            console.log('User Credential:', user);
            setError('');
            setEmail('');
            navigate('/profile', { state: { user } });
        } catch (error_) {
            setError(error_.message);
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
                        <h2 className={styles.c2}>Уже зареэстровані?</h2>
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
