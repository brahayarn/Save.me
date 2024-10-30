import React from 'react';

import styles from './PeopleCard.css';
import PeopleContainer from './PeopleCards/PeopleContainer';
import TagSystem from './TagsFilter/TagsFilter';

const PeopleCard = () => {
    return (
        <div className={styles.peopleContainer}>
            <PeopleContainer />
            <TagSystem />
        </div>
    );
};
export default PeopleCard;
