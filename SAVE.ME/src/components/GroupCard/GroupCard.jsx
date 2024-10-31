import React from 'react';

import TagSystem from '../GroupCard/GroupsCards/TagsFilter';
import GroupsContainer from './GroupsCards/GroupsContainer';
import styles from './PeopleCard.css';

const PeopleCard = () => {
    return (
        <div className={styles.peopleContainer}>
            <GroupsContainer />
            <TagSystem />
        </div>
    );
};
export default PeopleCard;
