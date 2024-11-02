import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
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

            fetchTags();
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

            fetchTags();
        } catch (error) {
            console.error('Error removing tag:', error);
        }
    };

    return (
        <div className={styles.peopleContainer}>
            <PeopleContainer
                tags={tags}
                userTags={userTags}
                setFilteredUsers={setFilteredUsers} // Передаємо функцію для оновлення
                filteredUsers={filteredUsers} // Передаємо відфільтрованих користувачів
            />
            <TagSystem tags={tags} userTags={userTags} onAddTag={handleAddTag} onRemoveTag={handleRemoveTag} />
        </div>
    );
};

PeopleCard.propTypes = {
    tags: PropTypes.array.isRequired,
    userTags: PropTypes.array.isRequired,
    setFilteredUsers: PropTypes.func.isRequired,
};

export default PeopleCard;
