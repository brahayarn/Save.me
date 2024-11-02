import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { auth, database } from '../../../firebase/config';
import styles from '../../PeopleCard/TagsFilter/Tags.css';

const GroupTagSystem = ({ userTags, setUserTags, fetchGroups }) => {
    const [tags, setTags] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
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

    useEffect(() => {
        fetchTags();
    }, []);

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

            fetchGroups();
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

            fetchGroups();
        } catch (error) {
            console.error('Error removing tag:', error);
        }
    };

    const filteredTags = tags
        .filter((tag) => tag.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => b.usage - a.usage);

    return (
        <div className={styles.right}>
            <div className={styles.textcontainer}>
                <p>Filter by tags</p>
            </div>
            <div className={styles.filterArea}>
                <input
                    type="text"
                    placeholder="Search tags..."
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                />
                <div data-testid="alltag" className={styles.alltag}>
                    {filteredTags.map((tag) => (
                        <div key={tag.id} data-testid="tag" className={styles.tag}>
                            <span>#{tag.name}</span>
                            <span className={styles.usage}>usage: {tag.usage || 0}</span>
                            {userTags.includes(tag.name) ? (
                                <button
                                    onClick={() => handleRemoveTag(tag.id)}
                                    data-testid="removeBtn"
                                    className={styles.removeBtn}
                                >
                                    Remove
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleAddTag(tag.id)}
                                    data-testid="addBtn"
                                    className={styles.addBtn}
                                >
                                    Add
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
GroupTagSystem.propTypes = {
    userTags: PropTypes.arrayOf(PropTypes.string).isRequired,
    setUserTags: PropTypes.func.isRequired,
    fetchGroups: PropTypes.func.isRequired,
};

export default GroupTagSystem;
