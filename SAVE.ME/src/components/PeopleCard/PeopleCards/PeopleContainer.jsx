import avatar from '@assets/icons/header/avatar.svg';
import { collection, getDocs } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { auth, database } from '../../../firebase/config';
import styles from './PeopleContainer.css';

const PeopleContainer = ({ userTags, filteredUsers, setFilteredUsers }) => {
    const [users, setUsers] = useState([]);
    const user = auth.currentUser;

    // Завантаження користувачів з Firestore
    useEffect(() => {
        const fetchUsers = async () => {
            const usersCollectionReference = collection(database, 'users');
            const usersSnap = await getDocs(usersCollectionReference);
            const usersList = usersSnap.docs
                .map((document_) => ({ id: document_.id, ...document_.data() }))
                .filter((person) => person.id !== user?.uid); // Виключити поточного користувача
            setUsers(usersList);
        };

        fetchUsers();
    }, [user]);

    // Фільтрація користувачів на основі тегів
    useEffect(() => {
        const updateFilteredUsers = users.map((person) => {
            const personTags = person.tags || [];
            const matchingTags = personTags.filter((tag) => userTags.includes(tag));
            const missingTags = personTags.filter((tag) => !userTags.includes(tag));

            return {
                ...person,
                userTags: matchingTags,
                missingTags: missingTags,
            };
        });

        setFilteredUsers(updateFilteredUsers);
    }, [users, userTags, setFilteredUsers]);

    return (
        <div className={styles.left}>
            <div className={styles.textcontainer}>
                <p>Familiar for you peoples</p>
            </div>
            <div className={styles.peopleArea}>
                {filteredUsers.length === 0 ? (
                    <p>No users found</p>
                ) : (
                    filteredUsers.map((person) => (
                        <div key={person.id} className={styles.person}>
                            <div className={styles.personInfo}>
                                <img src={avatar} alt="avatar" className={styles.avatar} />
                                <div className={styles.userInfo}>
                                    <h3>{person.nickname || 'User'}</h3>
                                    <p>{person.status || 'No status available'}</p>
                                    <div className={styles.tags}>
                                        <div className={styles.userTags}>
                                            {person.userTags.length > 0 ? (
                                                person.userTags.map((tag) => (
                                                    <span key={tag} className={styles.blueTag}>
                                                        {tag}
                                                    </span>
                                                ))
                                            ) : (
                                                <span>No matching tags</span>
                                            )}
                                        </div>
                                        <div className={styles.missingTags}>
                                            {person.missingTags.length > 0 ? (
                                                person.missingTags.map((tag) => (
                                                    <span key={tag} className={styles.grayTag}>
                                                        {tag}
                                                    </span>
                                                ))
                                            ) : (
                                                <span>No missing tags</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

PeopleContainer.propTypes = {
    userTags: PropTypes.array.isRequired,
    filteredUsers: PropTypes.array.isRequired,
    setFilteredUsers: PropTypes.func.isRequired,
};

export default PeopleContainer;
