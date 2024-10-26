import React from 'react';
import { useNavigate } from 'react-router-dom';

import backimg from '../../assets/images/backimg.svg';
import textImage from '../../assets/images/textpg.png';
import styles from './Auth.css';

const Auth = () => {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/profile');
    };
    return (
        <div className={styles.maincont} style={{ backgroundImage: `url(${backimg})` }}>
            <div className={styles.authform}>
                <form>
                    <div className={styles.top__container}>
                        <div>
                            <h1 className={styles.c}>Будь в потоці</h1>
                            <input type="email" placeholder="Email..." className={styles.inputc} />
                        </div>
                        <div>
                            <input type="password" placeholder="Password..." className={styles.inputc} />
                        </div>
                        <button className={styles.buttc}>Зареєструватися</button>
                    </div>

                    <div className={styles.bottom__container}>
                        <h2 className={styles.c2}>Уже зареэстровані?</h2>
                        <button onClick={handleLogin} className={styles.buttc}>
                            Ввійти
                        </button>
                    </div>
                </form>
            </div>

            <div className={styles.textimage}>
                <img src={textImage} alt="text-image" className={styles.textim} />
            </div>
        </div>
    );
};
export default Auth;
