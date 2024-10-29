import React from 'react';

import GroupCard from '../../components/GroupCard/GroupCard';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Group.css';

const Group = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header />
                <GroupCard />
            </div>
        </div>
    );
};
export default Group;
