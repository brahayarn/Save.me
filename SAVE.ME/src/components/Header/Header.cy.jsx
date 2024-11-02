import avatar from '@assets/icons/header/avatar.svg';
import messagesinf from '@assets/icons/header/massageinf.svg';
import { mount } from 'cypress/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Header from './Header';

describe('Тести компонента Header', () => {
    beforeEach(() => {
        mount(
            <MemoryRouter>
                <Header />
            </MemoryRouter>,
        );
    });

    it('повинен відображати заголовок з привітанням та поточною датою', () => {
        cy.contains('Welcome').should('be.visible');

        cy.get('p').should('not.be.empty');
    });

    it('повинен відображати поле пошуку та іконки сповіщень', () => {
        cy.get('input[placeholder="Search"]').should('be.visible');

        cy.get('img[alt="Messages Info"]').should('have.attr', 'src', messagesinf).should('be.visible');

        cy.get('img[alt="Profile"]').should('have.attr', 'src', avatar).should('be.visible');
    });
});
