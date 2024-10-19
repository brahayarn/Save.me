import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { signUp, logIn, logOut } from '../../firebase/services/authService';
import styles from './Main.css';
import textImage from '../../assets/images/textpg.png';
import backimg from '../../assets/images/backimg.svg';

const Main = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            await signUp(email, password);
            setSuccessMessage('Користувач успішно створений!');
            setError('');
            setEmail('');
            setPassword('');
        } catch (error) {
            setError(error.message);
            setSuccessMessage('');
        }
    };

    const handleLogIn = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await logIn(email, password);
            const user = {
                email: userCredential.user.email,
                uid: userCredential.user.uid,
            };
            console.log('User Credential:', user);
            setSuccessMessage('Користувач успішно увійшов!');
            setError('');
            setEmail('');
            setPassword('');
            navigate('/home', { state: { user } });
        } catch (err) {
            setError(err.message);
            setSuccessMessage('');
        }
    };

    const handleLogOut = async (e) => {
        e.preventDefault();
        try {
            await logOut();
            setSuccessMessage('Користувач успішно вийшов!');
            setError('');
        } catch (error) {
            setError(error.message);
            setSuccessMessage('');
        }
    };
    return (
        <div className={styles.main} style={{ backgroundImage: `url(${backimg})`}}>
            <div className={styles.authform}>
                <form>
                    <div className={styles.top__container}>
                        <div>
                        <h1>Будь в потоці</h1>
                            <input
                                type="email"
                                placeholder="Email..."
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password..."
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button onClick={handleSignUp} className={styles.button}>
                            Зареєструватися
                        </button>
                    </div>

                    <div className={styles.bottom__container}>
                        <h2>Уже зареэстровані?</h2>
                        <button onClick={handleLogIn} className={styles.button}>
                            Ввійти
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.text__image}>
                <img src={textImage} alt="text-image" />
            </div>
        </div>
    );
};
export default Main;
