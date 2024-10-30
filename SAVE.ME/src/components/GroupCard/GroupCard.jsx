import React from 'react';

import TagSystem from '../PeopleCard/TagsFilter/TagsFilter';
import styles from './GroupCard.css';
import GroupsContainer from './GroupsCards/GroupsContainer';

const PeopleCard = () => {
    return (
        <div className={styles.peopleContainer}>
            <GroupsContainer />
            <TagSystem />
        </div>
    );
};
export default PeopleCard;
