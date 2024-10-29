import React from 'react';

import Header from '../../components/Header/Header';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Profile.css';

const Profile = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header />
                <ProfileCard />
            </div>
        </div>
    );
};

export default Profile;
