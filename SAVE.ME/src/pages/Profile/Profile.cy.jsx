import { mount } from '@cypress/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import Profile from './Profile';
import styles from './Profile.css';

const mockProfileData = {
    nickname: 'TestNickname',
    gender: 'Male',
    language: 'English',
    status: 'Active',
    tags: ['tag1', 'tag2'],
    email: 'test@example.com',
};

describe('Компонент Profile', () => {
    beforeEach(() => {
        cy.window().then((window) => {
            window.localStorage.setItem('profileData', JSON.stringify(mockProfileData));
        });
    });

    it('повинен відображати компоненти Sidebar, Header і ProfileCard з актуальною інформацією', () => {
        mount(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>,
        );

        cy.get(`.${styles.mainContainer}`).within(() => {
            cy.get(`.${styles.mainContent}`).should('exist');

            cy.get('h2').contains(mockProfileData.nickname);
            cy.get('input[name="nickname"]').should('have.value', mockProfileData.nickname);
            cy.get('select[name="gender"]').should('have.value', mockProfileData.gender);
            cy.get('select[name="language"]').should('have.value', mockProfileData.language);
            cy.get('input[name="status"]').should('have.value', mockProfileData.status);
            cy.contains(mockProfileData.tags.join(', ')).should('exist');

            cy.get('img[alt="Mail Box"]').should('exist');
        });
    });
});
