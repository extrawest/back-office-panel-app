describe('office-ant', () => {
  it('should log user in', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('input[type="text"]').type('test1@test.com');
    cy.get('input[type="password"]').type('test123');
    cy.get('button').contains('Log in').click();
    cy.contains('a', 'Log out').should('be.visible');
  });

  it('should register new user', () => {
    const randomString = () =>
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    const email = `${randomString()}@${randomString()}.test`;
    cy.visit('/register');
    cy.url().should('includes', 'register');
    cy.get('input[type="text"]').type('userName');
    cy.get('input[type="email"]').type(email);
    cy.get('input[type="password"]').type('test123');
    cy.get('button').contains('Register').click();
    cy.contains('a', 'Log out').should('be.visible');
  });

  it('should log user out', () => {
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('a').contains('Log out').click();
    cy.contains('button', 'Log in').should('be.visible');
  });

  it('should open modal window', () => {
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('#openModal').click();
    cy.contains('button', 'Submit').should('be.visible');
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

  it('should link to client page', () => {
    cy.visit('/home/dashboard');
    cy.get('div').contains('Clients').click();
    cy.url().should('includes', '/home/clients');
    cy.get('nz-table').should('be.visible');
  });

  it('should add new ticket to client page', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('input[type="text"]').type('test1@test.com');
    cy.get('input[type="password"]').type('test123');
    cy.get('button').contains('Log in').click();

    cy.visit('/home/clients');
    cy.url().should('includes', '/home/clients');
    cy.get('#openModal').click();
    cy.get('nz-input-group>#ticketDetails').type('some ticket details');
    cy.get('nz-input-group>#customerName').type('test name');
    cy.get('nz-input-group>#date').type('2000-01-01');
    cy.get('nz-select').click();
    cy.get('nz-option-item').contains('LOW').click();
    cy.contains('button', 'Submit').click();
    cy.get('td').contains('some ticket details').should('be.visible');
  });
});
