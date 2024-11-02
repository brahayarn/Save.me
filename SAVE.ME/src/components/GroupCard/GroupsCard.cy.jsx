import { mount } from 'cypress/react';
import React from 'react';

import GroupsCard from '../../components/GroupCard/GroupCard';
import styles from './PeopleCard.css';

describe('<GroupsCard />', () => {
    it('рендерить головний контейнер з класом peopleContainer', () => {
        mount(<GroupsCard />);

        cy.get(`.${styles.peopleContainer}`).should('exist');
    });
});
