describe('Auth Component E2E Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:9000');
    });

    it('повинен завантажити сторінку коректно', () => {
        cy.get('input[placeholder="Email..."]').should('be.visible');
        cy.get('input[placeholder="Password..."]').should('be.visible');
        cy.contains('Зареєструватися').should('be.visible');
        cy.contains('Уже зареэстровані?').should('be.visible');
        cy.contains('Ввійти').should('be.visible');
    });

    it('повинен зареєструвати нового користувача та перенаправити на профіль', () => {
        cy.get('input[placeholder="Email..."]').type('yranagrabar@gmail.com');
        cy.get('input[placeholder="Password..."]').type('Pppp123');
        cy.contains('Зареєструватися').click();
    });

    it('повинен увійти існуючим користувачем та перенаправити на профіль', () => {
        cy.get('input[placeholder="Email..."]').type('yranagrabar@gmail.com');
        cy.get('input[placeholder="Password..."]').type('Pppp123');
        cy.contains('Ввійти').click();

        cy.visit('http://localhost:9000/profile');
        cy.url().should('include', 'http://localhost:9000/profile');
    });
});
