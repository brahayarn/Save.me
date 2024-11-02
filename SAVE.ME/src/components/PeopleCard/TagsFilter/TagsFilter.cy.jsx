import { mount } from '@cypress/react';
import React from 'react';

import TagSystem from '../TagsFilter/TagsFilter';
import styles from './Tags.css';

describe('Компонент TagSystem', () => {
    const sampleTags = [
        {
            id: 1,
            name: 'Ya',
            usage: 21,
        },
        {
            id: 2,
            name: 'ВАЖКО',
            usage: 1_000_014,
        },
        {
            id: 3,
            name: 'саморозвиток',
            usage: 115,
        },
    ];

    const sampleUserTags = ['Ya'];
    let onAddTag;
    let onRemoveTag;

    beforeEach(() => {
        onAddTag = cy.stub();
        onRemoveTag = cy.stub();

        mount(<TagSystem tags={sampleTags} userTags={sampleUserTags} onAddTag={onAddTag} onRemoveTag={onRemoveTag} />);
    });

    it('фільтрує теги на основі пошукового запиту', () => {
        cy.get('input[placeholder="Search tags..."]').type('ВАЖКО');

        cy.get(`.${styles.alltag} .${styles.tag}`).should('have.length', 1);
        cy.get(`.${styles.tag}`).contains('ВАЖКО');
    });

    it('відображає повідомлення, якщо немає відповідних тегів', () => {
        cy.get('input[placeholder="Search tags..."]').type('неіснуючий');

        cy.get(`.${styles.alltag}`).should('not.contain', 'No matching tags found');
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

    it('перевіряє, що кнопки "Додати" і "Видалити" відображаються відповідно', () => {
        cy.get(`.${styles.tag}`)
            .contains('ВАЖКО')
            .parent()
            .within(() => {
                cy.get(`.${styles.addBtn}`).should('be.visible');
                cy.get(`.${styles.removeBtn}`).should('not.exist');
            });

        cy.get(`.${styles.tag}`)
            .contains('Ya')
            .parent()
            .within(() => {
                cy.get(`.${styles.removeBtn}`).should('be.visible');
                cy.get(`.${styles.addBtn}`).should('not.exist');
            });
    });

    it('перевіряє, що поле вводу реагує на зміни', () => {
        cy.get('input[placeholder="Search tags..."]').type('саморозвиток');

        cy.get(`.${styles.alltag} .${styles.tag}`).should('have.length', 1);
        cy.get(`.${styles.tag}`).contains('саморозвиток');
    });
});
