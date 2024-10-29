import React from 'react';

import ChatCard from '../../components/ChatCard/ChatCard';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Chat.css';

const Chat = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header />
                <ChatCard />
            </div>
        </div>
    );
};

export default Chat;
