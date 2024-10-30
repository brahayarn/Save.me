import avatar from '@assets/icons/header/avatar.svg';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, database } from '../../../firebase/config';
import styles from './PeopleContainer.css';

const PeopleContainer = () => {
    const [users, setUsers] = useState([]);
    const [currentUserTags, setCurrentUserTags] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    const user = auth.currentUser;
    const navigate = useNavigate();

    const handleGetText = () => {
        navigate('/chat');
    };

    useEffect(() => {
        const fetchCurrentUserData = async () => {
            if (user) {
                const userProfileReference = doc(database, 'users', user.uid);
                const userProfileSnap = await getDoc(userProfileReference);
                if (userProfileSnap.exists()) {
                    const data = userProfileSnap.data();
                    setCurrentUserTags(data.tags || []);
                }
            }
        };

        const fetchUsers = async () => {
            const usersCollectionReference = collection(database, 'users');
            const usersSnap = await getDocs(usersCollectionReference);
            const usersList = usersSnap.docs
                .map((document_) => ({ id: document_.id, ...document_.data() }))
                .filter((person) => person.id !== user?.uid);
            setUsers(usersList);
        };

        fetchCurrentUserData();
        fetchUsers();
    }, [user]);

    useEffect(() => {
        const updateFilteredUsers = users.map((person) => {
            const userTags = person.tags || [];
            const matchingTags = userTags.filter((tag) => currentUserTags.includes(tag));
            const missingTags = userTags.filter((tag) => !currentUserTags.includes(tag));

            return {
                ...person,
                userTags: matchingTags,
                missingTags: missingTags,
            };
        });

        setFilteredUsers(updateFilteredUsers);
    }, [users, currentUserTags]);

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
                            <button className={styles.getTextBtn} onClick={handleGetText}>
                                get text
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PeopleContainer;
