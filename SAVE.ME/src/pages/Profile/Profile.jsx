import React from 'react';

import Header from '../../components/Header/Header';
import ProfileCard from '../../components/ProfileCard/ProfileCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './Profile.css';



const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <Header />
      <div className={styles.profileMain}>
        <Sidebar />
        <div className={styles.profileContent}>
          <ProfileCard />
        </div>
      </div>
    </div>
  );
};

export default Profile;
