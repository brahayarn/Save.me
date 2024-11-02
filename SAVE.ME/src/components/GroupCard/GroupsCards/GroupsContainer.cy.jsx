import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import GroupsContainer from '../../GroupCard/GroupsCards/GroupsContainer';
import styles from '../../PeopleCard/PeopleCards/PeopleContainer.css';

describe('Тести компоненту GroupsContainer', () => {
    const mockGroups = [
        {
            id: '1',
            name: 'Саморозвиток',
            tags: ['саморозвиток', 'ВАЖКО'],
        },
        {
            id: 'TpZb2Q4vQFXgBtcbdp54g08S6Dt1',
            name: 'TpZb2Q4vQFXgBtcbdp54g08S6Dt1',
            tags: ['саморозвиток', 'ВАЖКО', 'Ya'],
        },
    ];

    const userTags = ['саморозвиток', 'ВАЖКО'];

    beforeEach(() => {
        cy.mount(
            <MemoryRouter>
                <GroupsContainer groups={mockGroups} userTags={userTags} />
            </MemoryRouter>,
        );
    });

    it('повинен відображати групи з відповідними тегами', () => {
        cy.contains('Familiar groups for you').should('be.visible');
        cy.contains('Саморозвиток').should('be.visible');
        cy.contains('TpZb2Q4vQFXgBtcbdp54g08S6Dt1').should('be.visible');
    });

    it('повинен показати відповідні та відсутні теги', () => {
        cy.contains('Саморозвиток')
            .parent()
            .find(`.${styles.userTags}`)
            .should('exist')
            .should('contain', 'саморозвиток')
            .and('contain', 'ВАЖКО');

        cy.contains('Саморозвиток')
            .parent()
            .find(`.${styles.missingTags}`)
            .should('exist')
            .should('contain', 'No missing tags');

        cy.contains('TpZb2Q4vQFXgBtcbdp54g08S6Dt1')
            .parent()
            .find(`.${styles.userTags}`)
            .should('exist')
            .should('contain', 'саморозвиток')
            .and('contain', 'ВАЖКО');

        cy.contains('TpZb2Q4vQFXgBtcbdp54g08S6Dt1')
            .parent()
            .find(`.${styles.missingTags}`)
            .should('exist')
            .should('contain', 'Ya');
    });

    it('повинен відображати повідомлення про відсутність груп', () => {
        cy.mount(
            <MemoryRouter>
                <GroupsContainer groups={[]} userTags={userTags} />
            </MemoryRouter>,
        );

        cy.contains('No groups found').should('be.visible');
    });
});
