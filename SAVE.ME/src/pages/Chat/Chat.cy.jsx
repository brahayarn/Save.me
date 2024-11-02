import { mount } from '@cypress/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Chat from './Chat';
import styles from './Chat.css';

describe('Компонент Chat', () => {
    it('повинен відображати компоненти Sidebar, Header і ChatCard у своїх контейнерах', () => {
        mount(
            <MemoryRouter>
                <Chat />
            </MemoryRouter>,
        );

        cy.get(`.${styles.mainContainer}`).within(() => {
            cy.get(`.${styles.mainContent}`).should('exist');
        });
    });
});
