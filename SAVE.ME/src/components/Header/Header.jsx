import avatar from '@assets/icons/header/avatar.svg';
import messagesinf from '@assets/icons/header/massageinf.svg';
import search from '@assets/icons/header/search.svg';
import React from 'react';

import styles from './Header.css';

const Header = () => {
    return (
        <header className={styles.profileheader}>
            <div className={styles.headerleft}>
                <h1>Welcome, User</h1>
                <p>today time</p>
            </div>
            <div className={styles.headerright}>
                <div className={styles.searchsection}>
                    <img src={search} alt="Search" />
                    <input type="text" placeholder="Search" />
                </div>
                <img src={messagesinf} alt="Messages Info" className={styles.mesinfo} />
                <img src={avatar} alt="Profile" className={styles.profilepic} />
            </div>
        </header>
    );
};

export default Header;
