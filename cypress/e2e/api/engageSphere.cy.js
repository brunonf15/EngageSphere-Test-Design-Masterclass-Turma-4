describe('EngageSphere API - Customers', () => {
  it('Successfully retrieves customers with default filters', () => {
    cy.request(
      `${Cypress.env("apiUrl")}/customers`
    ).as('api');

    cy.get('@api').should((response) => {
      expect(response).to.have.property('status', 200);
    });
  });
});
