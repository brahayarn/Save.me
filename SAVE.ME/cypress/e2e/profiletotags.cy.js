describe('ProfileCard Component E2E Tests', () => {
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

            window.firebase = {
                auth: () => ({
                    currentUser: {
                        uid: 'testUserId',
                        email: 'test@example.com',
                        displayName: 'Test User',
                    },
                    signOut: cy.stub().as('signOut'),
                }),
            };
        });

        cy.visit('http://localhost:9000/profile');
    });

    it('should render the profile card correctly', () => {
        cy.get('h2').contains('TestNickname');
        cy.get('input[name="nickname"]').should('have.value', 'TestNickname');
        cy.get('select[name="gender"]').should('have.value', 'Male');
        cy.get('select[name="language"]').should('have.value', 'English');
        cy.get('input[name="status"]').should('have.value', 'Active');
        cy.get('[data-testid="tags-container"]').contains('tag1, tag2');
        cy.get('[data-testid="mail-image"]').should('exist');
        cy.get('[data-testid="logout-button"]').click();
    });

    it('should allow editing of the nickname', () => {
        cy.get('[data-testid="edit-button"]').click();

        cy.get('input[name="nickname"]').clear();
        cy.get('input[name="nickname"]').type('NewNickname');
        cy.get('[data-testid="edit-button"]').click();

        cy.get('input[name="nickname"]').should('have.value', 'NewNickname');
    });

    it('should logout the user', () => {
        cy.get('[data-testid="logout-button"]').click();
    });
});
