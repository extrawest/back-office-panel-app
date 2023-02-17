describe('office-tailwind', () => {
  it('should link to client page', () => {
    cy.visit('/home/dashboard');
    cy.get('a').contains('Clients').click();
    cy.url().should('includes', '/home/clients');
    cy.get('table').should('be.visible');
  });

  it('should open modal window for adding new task', () => {
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('#openModalTask').click();
    cy.contains('button', 'Add').should('be.visible');
  });

  it('should open modal window for adding new task', () => {
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('#openModalTicket').click();
    cy.contains('button', 'Add').should('be.visible');
  });
});
