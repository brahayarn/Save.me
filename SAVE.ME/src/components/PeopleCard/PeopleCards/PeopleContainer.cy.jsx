import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import PeopleContainer from './PeopleContainer';
import styles from './PeopleContainer.css';

describe('Тести компоненту PeopleContainer', () => {
    const mockUsers = [
        {
            id: 'TpZb2Q4vQFXgBtcbdp54g08S6Dt1',
            nickname: 'sadasdewfewfasd',
            tags: ['саморозвиток', 'ВАЖКО'],
        },
        {
            id: 'djLs6lc0G0U8Udnc8apzN4oU1Pf2',
            nickname: 'yana',
            tags: ['саморозвиток', 'ВАЖКО'],
        },
    ];

    const userTags = ['саморозвиток', 'ВАЖКО'];

    beforeEach(() => {
        cy.mount(
            <MemoryRouter>
                <PeopleContainer userTags={userTags} filteredUsers={mockUsers} setFilteredUsers={() => {}} />
            </MemoryRouter>,
        );
    });

    it('повинен відображати людей з відповідними тегами', () => {
        cy.contains('Familiar for you peoples').should('be.visible');
        cy.contains('sadasdewfewfasd').should('be.visible');
        cy.contains('yana').should('be.visible');
    });

    it('повинен показати відповідні та відсутні теги', () => {
        cy.contains('sadasdewfewfasd')
            .parent()
            .find(`.${styles.userTags}`)
            .should('exist')
            .should('contain', 'саморозвиток')
            .and('contain', 'ВАЖКО');

        cy.contains('sadasdewfewfasd')
            .parent()
            .find(`.${styles.missingTags}`)
            .should('exist')
            .should('contain', 'No missing tags');

        cy.contains('yana')
            .parent()
            .find(`.${styles.userTags}`)
            .should('exist')
            .should('contain', 'саморозвиток')
            .and('contain', 'ВАЖКО');

        cy.contains('yana')
            .parent()
            .find(`.${styles.missingTags}`)
            .should('exist')
            .should('contain', 'No missing tags');
    });

    it('повинен відображати повідомлення про відсутність користувачів', () => {
        cy.mount(
            <MemoryRouter>
                <PeopleContainer userTags={userTags} filteredUsers={[]} setFilteredUsers={() => {}} />
            </MemoryRouter>,
        );

        cy.contains('No users found').should('be.visible');
    });
});
