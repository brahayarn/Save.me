import React from 'react';

import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import styles from './NotFound.css';

const NotFound = () => {
    return (
        <div className={styles.mainContainer}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Header />
                <div className={styles.contenttt}>
                    <h1>404</h1>
                    <h2>Page not found</h2>
                    <p>Sorry, the page youre looking for doesnt exist.</p>
                </div>
            </div>
        </div>
    );
};
export default NotFound;
