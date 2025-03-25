describe('EngageSphere API - Customers', () => {
  it('Successfully retrieves customers with default filters', () => {
    cy.request(
      `${Cypress.env("apiUrl")}/customers`
    ).as('getCustomers');

    cy.get('@getCustomers').should((response) => {
      expect(response).to.have.property('status', 200);
    });
  });
});
