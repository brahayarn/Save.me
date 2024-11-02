import { mount } from '@cypress/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import People from './People';
import styles from './People.css';

describe('Компонент Group', () => {
    it('повинен відображати компоненти Sidebar, Header і PeopleCard у своїх контейнерах', () => {
        mount(
            <MemoryRouter>
                <People />
            </MemoryRouter>,
        );

        cy.get(`.${styles.mainContainer}`).within(() => {
            cy.get(`.${styles.mainContent}`).should('exist');
        });
    });
});
