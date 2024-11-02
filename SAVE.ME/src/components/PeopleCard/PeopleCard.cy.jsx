import { mount } from 'cypress/react';
import React from 'react';

import PeopleCard from '../PeopleCard/PeopleCard';
import styles from './PeopleCard.css';

describe('<PeopleCard />', () => {
    it('рендерить головний контейнер з класом peopleContainer', () => {
        mount(<PeopleCard />);

        cy.get(`.${styles.peopleContainer}`).should('exist');
    });
});
