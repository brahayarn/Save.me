import avatar from '@assets/icons/header/avatar.svg';
import messagesinf from '@assets/icons/header/massageinf.svg';
import search from '@assets/icons/header/search.svg';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import styles from './Header.css';

const Header = () => {
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState('');

    useEffect(() => {
        const today = new Date();
        setCurrentDate(
            today.toLocaleDateString('uk-UA', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            }),
        );
    }, []);

    const handleNotification = () => {
        navigate('/chat');
    };

    return (
        <header className={styles.profileheader}>
            <div className={styles.headerleft}>
                <h1>Welcome</h1>
                <p>{currentDate}</p>
            </div>
            <div className={styles.headerright}>
                <div className={styles.searchsection}>
                    <img src={search} alt="Search" />
                    <input type="text" placeholder="Search" />
                </div>
                <img src={messagesinf} alt="Messages Info" className={styles.mesinfo} onClick={handleNotification} />
                <Link to="/settings" data-title="Settings">
                    <img src={avatar} alt="Profile" className={styles.profilepic} />
                </Link>
            </div>
        </header>
    );
};

export default Header;
