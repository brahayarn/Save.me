import React from 'react';

import backimg from '../../assets/images/backimg.svg';
import textImage from '../../assets/images/textpg.png';
import styles from './Auth.css';

const Auth = () => {
    return (
        <div className={styles.main} style={{ backgroundImage: `url(${backimg})` }}>
            <div className={styles.authform}>
                <form>
                    <div className={styles.top__container}>
                        <div>
                            <h1>Будь в потоці</h1>
                            <input type="email" placeholder="Email..." />
                        </div>
                        <div>
                            <input type="password" placeholder="Password..." />
                        </div>
                        <button className={styles.button}>Зареєструватися</button>
                    </div>

                    <div className={styles.bottom__container}>
                        <h2>Уже зареэстровані?</h2>
                        <button className={styles.button}>Ввійти</button>
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
