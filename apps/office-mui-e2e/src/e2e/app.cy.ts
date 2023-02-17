describe('office-mui', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('input[type="text"]').type('test@test.com');
    cy.get('input[type="password"]').type('test123');
    cy.get('button').contains('Login').click();
  });

  it('should add new ticket to client page', () => {
    cy.visit('#/home/clients');
    cy.url().should('includes', '/home/clients');
    cy.get('#openModal').click();
    cy.get('textarea').type('some ticket details');
    cy.get('input[type="text"]').type('test name');
    cy.get('input[type="date"]').type('2000-01-01');
    cy.get('mat-select#mat-select').click();
    cy.get('mat-option').contains('LOW').click();
    cy.contains('button', 'Add').click();
    cy.contains('td', 'some ticket details').should('be.visible');
  });

  it('should log user out', () => {
    cy.visit('#/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.contains('span', 'Log out').click();
    cy.contains('h1', 'Login to account').should('be.visible');
  });

  it('should link to client page', () => {
    cy.visit('#/home/dashboard');
    cy.contains('a', 'Clients').click();
    cy.url().should('includes', '#/home/clients');
    cy.get('table').should('be.visible');
  });
});
