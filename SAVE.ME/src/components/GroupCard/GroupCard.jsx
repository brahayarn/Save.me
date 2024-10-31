import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';

import { auth, database } from '../../firebase/config';
import GroupsContainer from '../GroupCard/GroupsCards/GroupsContainer';
import GroupTagSystem from '../GroupCard/GroupsCards/TagsFilter';
import styles from './PeopleCard.css';

const GroupsCard = () => {
    const [groups, setGroups] = useState([]);
    const [userTags, setUserTags] = useState([]);

    const userId = auth.currentUser?.uid;

    const fetchGroups = useCallback(async () => {
        const groupsCollectionReference = collection(database, 'groups');
        const groupsSnap = await getDocs(groupsCollectionReference);
        const groupsList = groupsSnap.docs
            .map((document_) => ({ id: document_.id, ...document_.data() }))
            .filter((group) => !group.members || !group.members.includes(userId));
        setGroups(groupsList);
    }, [userId]);

    const fetchUserTags = useCallback(async () => {
        if (!userId) return;

        const userDocumentReference = doc(database, 'users', userId);
        const userDocument = await getDoc(userDocumentReference);
        if (userDocument.exists()) {
            setUserTags(userDocument.data().tags || []);
        }
    }, [userId]);

    useEffect(() => {
        fetchGroups();
        fetchUserTags();
    }, [userId, fetchGroups, fetchUserTags]);

    return (
        <div className={styles.peopleContainer}>
            <GroupsContainer groups={groups} userTags={userTags} />
            <GroupTagSystem userTags={userTags} setUserTags={setUserTags} fetchGroups={fetchGroups} />
        </div>
    );
};

export default GroupsCard;
