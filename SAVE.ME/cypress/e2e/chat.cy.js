describe('Chat Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9000/chat');
    });

    it('renders without crashing', () => {
        cy.get('[data-testid="chatContainer"]').should('exist');

        cy.get('[data-testid="sidebar"]').should('exist');

        cy.get('[data-testid="chatArea"]').should('exist');

        cy.get('[data-testid="profile"]').should('exist');

        cy.get('input[placeholder="Search"]').should('exist');

        cy.get('input[placeholder="Write a message..."]').should('exist');

        cy.get('button').contains('Block the user').should('exist');
    });
});
