describe('office-ant', () => {
  it('should open modal window', () => {
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('#openModalTask').click();
    cy.contains('button', 'Submit').should('be.visible');
  });

  it('should add new task', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('input[type="text"]').type('test1@test.com');
    cy.get('input[type="password"]').type('test123');
    cy.get('button').contains('Log in').click();
    cy.contains('a', 'Log out').should('be.visible');
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('#openModalTask').click();
    cy.get('input[type="text"]').type('testName');
    cy.get('nz-select').click();
    cy.get('nz-option-item').contains('DEFAULT').click();
    cy.contains('button', 'Submit').click();
    cy.contains('a', 'Log out').should('be.visible');
    cy.get('label').contains('testName').should('be.visible');
  });

  it('should add new ticket', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('input[type="text"]').type('test1@test.com');
    cy.get('input[type="password"]').type('test123');
    cy.get('button').contains('Log in').click();
    cy.contains('a', 'Log out').should('be.visible');
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('#openModalTicket').click();
    cy.get('input[type="text"]').type('ticketName');
    cy.get('input[type="number"]').type('100');
    cy.contains('button', 'Submit').click();
    cy.contains('a', 'Log out').should('be.visible');
    cy.get('label').contains('ticketName').should('be.visible');
  });
});
