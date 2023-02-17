describe('office-prime-ng', () => {
  it('should log user in', () => {
    cy.visit('/login');
    cy.url().should('includes', 'login');
    cy.get('input[type="text"]').type('test3@test.com');
    cy.get('input[type="password"]').type('test123');
    cy.get('button[label="Log in"]').click();
    cy.contains('span', 'Log out').should('be.visible');
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
    cy.get('button[label="Register"]').click();
    cy.contains('span', 'Log out').should('be.visible');
  });

  it('should log user out', () => {
    cy.visit('/home/dashboard');
    cy.url().should('includes', '/home/dashboard');
    cy.get('span').contains('Log out').click();
    cy.contains('div', 'Login to account').should('be.visible');
  });
});
