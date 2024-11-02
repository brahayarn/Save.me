import avatar from '@assets/icons/header/avatar.svg';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import styles from '../../PeopleCard/PeopleCards/PeopleContainer.css';

const GroupsContainer = ({ groups, userTags }) => {
    const [filteredGroups, setFilteredGroups] = useState([]);

    useEffect(() => {
        const updateFilteredGroups = groups.map((group) => {
            const groupTags = group.tags || [];
            const matchingTags = groupTags.filter((tag) => userTags.includes(tag));
            const missingTags = groupTags.filter((tag) => !userTags.includes(tag));

            return {
                ...group,
                groupTags: matchingTags,
                missingTags: missingTags,
            };
        });
        setFilteredGroups(updateFilteredGroups);
    }, [groups, userTags]);

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
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
GroupsContainer.propTypes = {
    groups: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string,
            tags: PropTypes.arrayOf(PropTypes.string),
        }),
    ).isRequired,
    userTags: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default GroupsContainer;
