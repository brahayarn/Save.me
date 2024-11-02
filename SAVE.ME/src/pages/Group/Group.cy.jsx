import { mount } from '@cypress/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Group from './Group';
import styles from './Group.css';

describe('Компонент Group', () => {
    it('повинен відображати компоненти Sidebar, Header і GroupCard у своїх контейнерах', () => {
        mount(
            <MemoryRouter>
                <Group />
            </MemoryRouter>,
        );

        cy.get(`.${styles.mainContainer}`).within(() => {
            cy.get(`.${styles.mainContent}`).should('exist');
        });
    });
});
