import { mount } from 'cypress/react';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Sidebar from './Sidebar';

describe('Sidebar Component', () => {
    it('renders without crashing', () => {
        mount(
            <Router>
                <Sidebar />
            </Router>,
        );

        it('should render the sidebar with correct data-title attributes', () => {
            cy.get('[data-title="Burgerlist"]').should('exist');

            cy.get('[data-title="Chats"]').should('exist');

            cy.get('[data-title="Tags"]').should('exist');

            cy.get('[data-title="Groups"]').should('exist');

            cy.get('[data-title="Light"]').should('exist');

            cy.get('[data-title="Settings"]').should('exist');
        });
    });
});
