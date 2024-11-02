describe('E2E Тести для TagSystem та PeopleContainer', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9000/groups');
    });

    it('фільтрує теги на основі пошукового запиту', () => {
        cy.get('input[placeholder="Search tags..."]').type('ВАЖКО');
        cy.get('[data-testid="alltag"] [data-testid="tag"]').should('have.length', 1);
        cy.get('[data-testid="tag"]').contains('ВАЖКО');
    });

    it('додає тег при натисканні кнопки "Додати"', () => {
        cy.get('[data-testid="tag"]')
            .contains('ВАЖКО')
            .parent()
            .within(() => {
                cy.get('[data-testid="addBtn"]').click();
            });
        cy.get('[data-testid="tag"]').contains('Ya').parent().should('exist');
    });

    it('перевіряє, що поле вводу реагує на зміни', () => {
        cy.get('input[placeholder="Search tags..."]').type('саморозвиток');
        cy.get('[data-testid="alltag"] [data-testid="tag"]').should('have.length', 1);
        cy.get('[data-testid="tag"]').contains('саморозвиток');
    });
});
