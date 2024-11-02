import { mount } from '@cypress/react';
import React from 'react';

import { auth, database } from '../../../firebase/config';
import styles from '../../PeopleCard/TagsFilter/Tags.css';
import GroupTagSystem from '../GroupsCards/TagsFilter';

describe('Компонент GroupTagSystem', () => {
    const sampleTags = [
        {
            id: 'hAs4ueHcVG7GR5v8SugQ',
            name: 'Ya',
            usage: 21,
            addedBy: ['userId1', 'userId2'],
        },
        {
            id: 'djLs6lc0G0U8Udnc8apzN4oU1Pf2',
            name: 'ВАЖКО',
            usage: 1_000_014,
            addedBy: ['djLs6lc0G0U8Udnc8apzN4oU1Pf2'],
        },
        {
            id: 'someUniqueIdForSelfDevelopment',
            name: 'саморозвиток',
            usage: 115,
            addedBy: ['djLs6lc0G0U8Udnc8apzN4oU1Pf2'],
        },
    ];
    const sampleUserTags = ['Ya'];
    let setUserTags;
    let fetchGroups;

    const mockCollection = () => ({
        get: () =>
            Promise.resolve({
                docs: sampleTags.map((tag) => ({
                    id: tag.id,
                    data: () => tag,
                })),
            }),
        doc: () => ({
            update: () => Promise.resolve(),
        }),
    });

    beforeEach(() => {
        setUserTags = cy.stub();
        fetchGroups = cy.stub();

        try {
            cy.stub(auth, 'currentUser').returns({
                uid: 'djLs6lc0G0U8Udnc8apzN4oU1Pf2',
                email: 'www@gmail.com',
            });
            console.log('Mocked current user successfully with UID:', 'djLs6lc0G0U8Udnc8apzN4oU1Pf2');
        } catch (error) {
            console.error('Error mocking current user:', error);
        }

        try {
            cy.stub(database, 'collection').callsFake(mockCollection);
            console.log('Mocked Firestore collection successfully.');
        } catch (error) {
            console.error('Error mocking Firestore:', error);
        }

        mount(<GroupTagSystem userTags={sampleUserTags} setUserTags={setUserTags} fetchGroups={fetchGroups} />);
    });

    it('фільтрує теги на основі пошукового запиту', () => {
        cy.get('input[placeholder="Search tags..."]').type('ВАЖКО');
        cy.get(`.${styles.alltag} .${styles.tag}`).should('have.length', 1);
        cy.get(`.${styles.tag}`).contains('ВАЖКО');
    });

    it('додає тег при натисканні кнопки "Додати"', () => {
        cy.get(`.${styles.tag}`)
            .contains('ВАЖКО')
            .parent()
            .within(() => {
                cy.get(`.${styles.addBtn}`).click();
            });
    });

    it('видаляє тег при натисканні кнопки "Видалити"', () => {
        cy.get(`.${styles.tag}`)
            .contains('Ya')
            .parent()
            .within(() => {
                cy.get(`.${styles.removeBtn}`).click();
            });
    });
});
