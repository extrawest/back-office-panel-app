describe('office-nebular', () => {
  it('should display place to reset password', () => {
    cy.visit('/login');
    cy.url().should('includes', '/login');
    cy.get('a').click();
    cy.contains('button', 'Submit').should('be.visible');
  });

  it('should link to register page', () => {
    cy.visit('/login');
    cy.contains('p', 'Register here').click();
    cy.url().should('includes', '/register');
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
    cy.contains('button', 'Register').click();
    cy.contains('a', 'Log out').should('be.visible');
  });
});
