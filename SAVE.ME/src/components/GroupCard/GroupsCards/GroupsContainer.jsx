import avatar from '@assets/icons/header/avatar.svg';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { auth, database } from '../../../firebase/config';
import styles from '../../PeopleCard/PeopleCards/PeopleContainer.css';

const PeopleContainer = () => {
    const [groups, setGroups] = useState([]);
    const [currentUserTags, setCurrentUserTags] = useState([]);
    const [filteredGroups, setFilteredGroups] = useState([]);

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

        const fetchGroups = async () => {
            const groupsCollectionReference = collection(database, 'groups');
            const groupsSnap = await getDocs(groupsCollectionReference);
            const groupsList = groupsSnap.docs
                .map((document_) => ({ id: document_.id, ...document_.data() }))
                .filter((group) => !group.members || !group.members.includes(user?.uid));

            console.log('Fetched groups:', groupsList);
            setGroups(groupsList);
        };

        fetchCurrentUserData();
        fetchGroups();
    }, [user]);

    useEffect(() => {
        const updateFilteredGroups = groups.map((group) => {
            const groupTags = group.tags || [];
            const matchingTags = groupTags.filter((tag) => currentUserTags.includes(tag));
            const missingTags = groupTags.filter((tag) => !currentUserTags.includes(tag));

            return {
                ...group,
                groupTags: matchingTags,
                missingTags: missingTags,
            };
        });

        setFilteredGroups(updateFilteredGroups);
        console.log('Filtered groups:', updateFilteredGroups);
    }, [groups, currentUserTags]);

    return (
        <div className={styles.left}>
            <div className={styles.textcontainer}>
                <p>Familiar groups for you</p>
            </div>
            <div className={styles.peopleArea}>
                {filteredGroups.length === 0 ? (
                    <p>No groups found</p>
                ) : (
                    filteredGroups.map((group) => (
                        <div key={group.id} className={styles.person}>
                            <div className={styles.personInfo}>
                                <img src={avatar} alt="avatar" className={styles.avatar} />
                                <div className={styles.userInfo}>
                                    <h3>{group.name || 'Group'}</h3>
                                    <div className={styles.tags}>
                                        <div className={styles.userTags}>
                                            {group.groupTags.length > 0 ? (
                                                group.groupTags.map((tag) => (
                                                    <span key={tag} className={styles.blueTag}>
                                                        {tag}
                                                    </span>
                                                ))
                                            ) : (
                                                <span>No matching tags</span>
                                            )}
                                        </div>
                                        <div className={styles.missingTags}>
                                            {group.missingTags.length > 0 ? (
                                                group.missingTags.map((tag) => (
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
