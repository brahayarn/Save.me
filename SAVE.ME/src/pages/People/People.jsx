import React from 'react';

import Header from '../../components/Header/Header';
import PeopleCard from '../../components/PeopleCard/PeopleCard';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './People.css';

const People = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header />
                <PeopleCard />
            </div>
        </div>
    );
};
export default People;
