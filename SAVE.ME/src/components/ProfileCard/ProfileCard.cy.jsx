import { mount } from '@cypress/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import ProfileCard from './ProfileCard';

const mockUser = {
    uid: 'testUserId',
    email: 'test@example.com',
    displayName: 'Test User',
};

const mockFirebase = {
    auth: () => ({
        currentUser: mockUser,
        signOut: cy.stub().as('signOut'),
    }),
};

describe('ProfileCard Component', () => {
    beforeEach(() => {
        cy.window().then((window) => {
            window.localStorage.setItem(
                'profileData',
                JSON.stringify({
                    nickname: 'TestNickname',
                    gender: 'Male',
                    language: 'English',
                    status: 'Active',
                    tags: ['tag1', 'tag2'],
                    email: 'test@example.com',
                }),
            );

            window.firebase = mockFirebase;
        });
    });

    it('should render the profile card correctly', () => {
        mount(
            <MemoryRouter>
                <ProfileCard />
            </MemoryRouter>,
        );

        cy.get('h2').contains('TestNickname');
        cy.get('input[name="nickname"]').should('have.value', 'TestNickname');
        cy.get('select[name="gender"]').should('have.value', 'Male');
        cy.get('select[name="language"]').should('have.value', 'English');
        cy.get('input[name="status"]').should('have.value', 'Active');
        cy.get('[data-testid="tags-container"]').contains('tag1, tag2');
        cy.get('[data-testid="mail-image"]').should('exist');
        cy.get('[data-testid="logout-button"]').should('exist');
    });

    it('should allow editing of the nickname', () => {
        mount(
            <MemoryRouter>
                <ProfileCard />
            </MemoryRouter>,
        );

        cy.get('[data-testid="edit-button"]').click();

        cy.get('input[name="nickname"]').clear();
        cy.get('input[name="nickname"]').type('NewNickname');
        cy.get('[data-testid="edit-button"]').click();

        cy.get('input[name="nickname"]').should('have.value', 'NewNickname');
    });

    it('should logout the user', () => {
        mount(
            <MemoryRouter>
                <ProfileCard />
            </MemoryRouter>,
        );

        cy.get('[data-testid="logout-button"]').click();
    });
});
