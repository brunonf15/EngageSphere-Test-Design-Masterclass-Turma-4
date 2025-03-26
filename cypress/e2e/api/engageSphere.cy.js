describe('EngageSphere API - Customers', () => {
  it('Recupera clientes com sucesso (por exemplo, verifica o código de status 200)', () => {
    cy.request(`${Cypress.env("apiUrl")}/customers`).as('getCustomers');

    cy.get('@getCustomers').should((response) => {
      expect(response).to.have.property('status', 200);
    });
  });

  it('Realiza a paginação de clientes corretamente', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: {
        page: 2,
        limit: 1,
        size: 'All',
        industry: 'All'
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('pageInfo');
      expect(response.body.pageInfo).to.deep.include({
        currentPage: 2,
      });
    });
  });

  it('Filtra corretamente o limite de clientes', () => {
    const limit = 2;

    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: {
        page: 2,
        limit: limit,
        size: 'All',
        industry: 'All'
      }
    }).then((response) => {
      const totalCustomers = response.body.pageInfo.totalCustomers;
      const expectedTotalPages = Math.ceil(totalCustomers / limit);

      expect(response.body.pageInfo).to.deep.include({
        totalPages: expectedTotalPages,
        totalCustomers: totalCustomers
      });
    });
  });

  it('Trata requisições inválidas (por exemplo, página negativa)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: { page: -1, limit: 5, size: 'All', industry: 'All' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });

  it('Trata requisições inválidas (por exemplo, limite negativo)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: { page: 1, limit: -5, size: 'All', industry: 'All' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });

  it('Trata requisições inválidas (por exemplo, página como string)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: { page: 'abc', limit: 5, size: 'All', industry: 'All' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });

  it('Trata requisições inválidas (por exemplo, limite como booleano)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: { page: 1, limit: false, size: 'All', industry: 'All' },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Invalid page or limit. Both must be positive numbers.');
    });
  });

  it('Trata requisições inválidas (por exemplo, tamanho não suportado)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: {
        page: 1,
        limit: 5,
        size: 'InvalidSize', // Valor não suportado
        industry: 'All'
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Unsupported size value. Supported values are All, Small, Medium, Enterprise, Large Enterprise, and Very Large Enterprise.');
    });
  });

  it('Trata requisições inválidas (por exemplo, indústria não suportada)', () => {
    cy.request({
      method: 'GET',
      url: `${Cypress.env("apiUrl")}/customers`,
      qs: {
        page: 1,
        limit: 5,
        size: 'All',
        industry: 'InvalidIndustry' // Valor não suportado
      },
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(400);
      expect(response.body).to.have.property('error', 'Unsupported industry value. Supported values are All, Logistics, Retail, Technology, HR, and Finance.');
    });
  });


});
