import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';

import { auth, database } from '../../firebase/config';
import styles from './PeopleCard.css';
import PeopleContainer from './PeopleCards/PeopleContainer';
import TagSystem from './TagsFilter/TagsFilter';

const PeopleCard = () => {
    const [tags, setTags] = useState([]);
    const [userTags, setUserTags] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const userId = auth.currentUser?.uid;

    const fetchTags = async () => {
        try {
            const tagsCollection = await getDocs(collection(database, 'tags'));
            const tagsData = tagsCollection.docs.map((document_) => ({ id: document_.id, ...document_.data() }));
            setTags(tagsData);
        } catch (error) {
            console.error('Error fetching tags:', error);
        }
    };

    const fetchUserTags = useCallback(async () => {
        if (!userId) return;

        try {
            const userDocumentReference = doc(database, 'users', userId);
            const userDocument = await getDoc(userDocumentReference);

            if (userDocument.exists()) {
                setUserTags(userDocument.data().tags || []);
            } else {
                await setDoc(userDocumentReference, { tags: [] });
                setUserTags([]);
            }
        } catch (error) {
            console.error('Error fetching user tags:', error);
        }
    }, [userId]);

    useEffect(() => {
        fetchTags();
        fetchUserTags();
    }, [userId, fetchUserTags]);

    useEffect(() => {
        const fetchFilteredUsers = async () => {
            const usersCollectionReference = collection(database, 'users');
            const usersSnap = await getDocs(usersCollectionReference);
            const usersList = usersSnap.docs
                .map((document_) => ({ id: document_.id, ...document_.data() }))
                .filter((person) => person.id !== userId);

            const updatedFilteredUsers = usersList
                .map((person) => {
                    const personTags = person.tags || [];
                    const matchingTags = personTags.filter((tag) => userTags.includes(tag));
                    const missingTags = personTags.filter((tag) => !userTags.includes(tag));

                    return {
                        ...person,
                        matchingTags,
                        missingTags,
                    };
                })
                .sort((a, b) => {
                    const aHasTags = a.matchingTags.length > 0;
                    const bHasTags = b.matchingTags.length > 0;

                    if (aHasTags && !bHasTags) return -1;
                    if (!aHasTags && bHasTags) return 1;

                    return b.matchingTags.length - a.matchingTags.length;
                });

            setFilteredUsers(updatedFilteredUsers);
        };

        fetchFilteredUsers();
    }, [userTags, userId]);

    const handleAddTag = async (tagId) => {
        if (!userId) return;

        try {
            const tag = tags.find((t) => t.id === tagId);
            if (!tag || userTags.includes(tag.name)) return;

            const updatedUsage = tag.usage + 1;
            const updatedAddedBy = [...(tag.addedBy || []), userId];

            await updateDoc(doc(database, 'tags', tagId), {
                usage: updatedUsage,
                addedBy: updatedAddedBy,
            });

            const updatedUserTags = [...userTags, tag.name];
            await updateDoc(doc(database, 'users', userId), { tags: updatedUserTags });
            setUserTags(updatedUserTags);
        } catch (error) {
            console.error('Error adding tag:', error);
        }
    };

    const handleRemoveTag = async (tagId) => {
        if (!userId) return;

        try {
            const tag = tags.find((t) => t.id === tagId);
            if (!tag) return;

            const updatedAddedBy = (tag.addedBy || []).filter((id) => id !== userId);
            const updatedUsage = Math.max((tag.usage || 1) - 1, 0);

            await updateDoc(doc(database, 'tags', tagId), {
                addedBy: updatedAddedBy,
                usage: updatedUsage,
            });

            const updatedUserTags = userTags.filter((t) => t !== tag.name);
            await updateDoc(doc(database, 'users', userId), { tags: updatedUserTags });
            setUserTags(updatedUserTags);
        } catch (error) {
            console.error('Error removing tag:', error);
        }
    };

    return (
        <div className={styles.peopleContainer}>
            <PeopleContainer userTags={userTags} setFilteredUsers={setFilteredUsers} filteredUsers={filteredUsers} />
            <TagSystem tags={tags} userTags={userTags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} />
        </div>
    );
};

export default PeopleCard;
