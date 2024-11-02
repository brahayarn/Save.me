import { mount } from 'cypress/react';
import React from 'react';

import Chat from './ChatCard';
import styles from './ChatCard.css';

describe('Chat Component', () => {
    it('renders without crashing', () => {
        mount(<Chat />);

        cy.get(`.${styles.chatContainer}`).should('exist');

        cy.get(`.${styles.sidebar}`).should('exist');

        cy.get(`.${styles.chatArea}`).should('exist');

        cy.get(`.${styles.profile}`).should('exist');

        cy.get('input[placeholder="Search"]').should('exist');

        cy.get('input[placeholder="Write a message..."]').should('exist');

        cy.get('button').contains('Block the user').should('exist');
    });
});
