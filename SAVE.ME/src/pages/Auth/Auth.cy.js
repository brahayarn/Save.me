import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Auth from '../../pages/Auth/Auth';

describe('Тести компоненту Auth', () => {
    beforeEach(() => {
        cy.mount(
            <MemoryRouter>
                <Auth />
            </MemoryRouter>,
        );
    });

    it('повинен завантажити сторінку коректно', () => {
        cy.get('input[placeholder="Email..."]').should('be.visible');
        cy.get('input[placeholder="Password..."]').should('be.visible');
        cy.contains('Зареєструватися').should('be.visible');
        cy.contains('Ввійти').should('be.visible');
    });

    it('повинен зареєструвати нового користувача та перенаправити на профіль', () => {
        cy.get('input[placeholder="Email..."]').type('testuser@gmail.com');
        cy.get('input[placeholder="Password..."]').type('Pppp11');
        cy.contains('Зареєструватися').click();
    });

    it('повинен увійти існуючим користувачем та перенаправити на профіль', () => {
        cy.get('input[placeholder="Email..."]').type('eee@gmail.com');
        cy.get('input[placeholder="Password..."]').type('Pppp11');
        cy.contains('Ввійти').click();
    });
});
