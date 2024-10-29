import avatar from '@assets/icons/header/avatar.svg';
import mailbox from '@assets/icons/header/mailbox.svg';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './ProfileCard.css';

function ProfileCard() {
    return (
        <div className={styles.profileContent}>
            <div className={styles.profileCard}>
                <div className={styles.userInfo}>
                    <img src={avatar} alt="Alexa Rawles" className={styles.userImage} />
                    <h2>Alexa Rawles</h2>
                    <button className={styles.editButton}>Edit</button>
                </div>

                <div className={styles.profileForm}>
                    <div className={styles.column}>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Nick Name</span>
                            <input type="text" placeholder="Nick Name" className={styles.inputField} />
                        </div>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Gender</span>
                            <input type="text" placeholder="Gender" className={styles.inputField} />
                        </div>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Choose Language</span>
                            <select className={styles.inputField}>
                                <option>Choose Language</option>
                            </select>
                        </div>
                    </div>

                    <div className={styles.column}>
                        <div className={styles.formRow}>
                            <span className={styles.label}>Статус</span>
                            <input type="text" placeholder="Статус" className={styles.inputField} />
                        </div>
                        <div className={styles.formRow}>
                            <span className={styles.label}>#</span>
                            <textarea
                                placeholder="your added tags.."
                                className={`${styles.inputField} ${styles.tagscont}`}
                                rows={4}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.usermaillog}>
                    <img src={mailbox} alt="Mail Box" className={styles.mailimg} />
                    <div className={styles.formRow}>
                        <span className={styles.label}>My email Address</span>
                        <p>alexarawles@gmail.com</p>
                    </div>

                    <Link to="/" data-title="Settings">
                        <button className={styles.logoutButton}>Logout</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
