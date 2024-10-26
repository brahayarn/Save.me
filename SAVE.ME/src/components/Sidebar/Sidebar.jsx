import burgerIcon from '@assets/icons/nonactive/burgerlist.svg';
import groupsIcon from '@assets/icons/nonactive/groups.svg';
import lightIcon from '@assets/icons/nonactive/lightmode.svg';
import chatIcon from '@assets/icons/nonactive/messages.svg';
import settingsIcon from '@assets/icons/nonactive/setting.svg';
import tagsIcon from '@assets/icons/nonactive/tags.svg';
import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Sidebar.css';

const Sidebar = () => {
    return (
        <aside className={styles.chatSidebar}>
            <ul className={styles.chatSidebarMenu}>
                <li>
                    <Link data-title="Burgerlist">
                        <img src={burgerIcon} alt="Burger Icon" className={styles.logoImage} />
                    </Link>
                </li>
                <li>
                    <Link to="/chat" data-title="Chats">
                        <img src={chatIcon} alt="Chats Icon" className={styles.logoImage} />
                    </Link>
                </li>
                <li>
                    <Link to="/tags" data-title="Tags">
                        <img src={tagsIcon} alt="Tags Icon" className={styles.logoImage} />
                    </Link>
                </li>
                <li>
                    <Link to="/groups" data-title="Groups">
                        <img src={groupsIcon} alt="Groups Icon" className={styles.logoImage} />
                    </Link>
                </li>
                <li>
                    <Link data-title="Light">
                        <img src={lightIcon} alt="Light Icon" className={styles.logoImage} />
                    </Link>
                </li>
                <li>
                    <Link to="/settings" data-title="Settings">
                        <img src={settingsIcon} alt="Settings Icon" className={styles.logoImage} />
                    </Link>
                </li>
            </ul>
        </aside>
    );
};

export default Sidebar;
