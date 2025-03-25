describe('EngageSphere - Customer List UI', () => {
  beforeEach(() => {
    cy.setCookie('cookieConsent', 'accepted');
    cy.visit('/');
  });

  it('Mantém os filtros ao voltar da visualização de detalhes do cliente', () => {
    // Arrange
    cy.get('[data-testid="size-filter"]').as('sizeFilter').select('Small');
    cy.contains('button', 'View').click();

    // Act
    cy.contains('button', 'Back').click();

    // Assert
    cy.get('@sizeFilter').should('have.value', 'Small');
  });

  it('Exibe o rodapé com o texto e links corretos', () => {
    cy.contains('p', 'Copyright 2025 - Talking About Testing').should(
      'be.visible'
    );

    cy.contains('a', 'Podcast')
      .should('be.visible')
      .and(
        'have.attr',
        'href',
        'https://open.spotify.com/show/5HFlqWkk6qtgJquUixyuKo'
      )
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');

    cy.contains('a', 'Courses')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talking-about-testing.vercel.app/')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');

    cy.contains('a', 'Blog')
      .should('be.visible')
      .and('have.attr', 'href', 'https://talkingabouttesting.com')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');

    cy.contains('a', 'YouTube')
      .should('be.visible')
      .and('have.attr', 'href', 'https://youtube.com/@talkingabouttesting')
      .and('have.attr', 'target', '_blank')
      .and('have.attr', 'rel', 'noopener noreferrer');
  });

  it('Exibe a saudação "Hi, there" quando nenhum nome é fornecido', () => {
    cy.get('[data-testid="name"]').should('have.value', '');

    cy.contains('h2', 'Hi there').should('be.visible');
  });

  it('Exibe a saudação "Hi, Joe" quando o nome é fornecido', () => {
    cy.get('[data-testid="name"]').type('Joe');

    cy.contains('h2', 'Hi Joe').should('be.visible');
  });

  it('Exibe o cabeçalho com um título, alternador de tema e um campo de entrada de texto', () => {
    cy.contains('h1', 'EngageSphere').should('be.visible');
    cy.get('[class^="ThemeToggle_button"]').should('be.visible');
    cy.get('[data-testid="name"]').should('be.visible');
  });

  it('Abre e fecha o messenger', () => {
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('#messenger-name').should('have.attr', 'required');
  });

  it('Garante que todos os campos do messenger são obrigatórios e que o primeiro está focado', () => {
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('#messenger-name').should('be.focused');
    cy.get('#messenger-name').should('have.attr', 'required');
    cy.get('#email').should('have.attr', 'required');
    cy.get('#message').should('have.attr', 'required');
  });

  it('Mostra e oculta uma mensagem de sucesso ao enviar o formulário do messenger com sucesso', () => {
    cy.clock();
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('#messenger-name').should('be.visible');
    cy.get('#messenger-name').type('John Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#message').type('Hello, I need support!');
    cy.get('[class^="Messenger_sendButton"]').click();
    cy.get('[class^="Messenger_success"]')
      .should('be.visible')
      .and('contain', 'Your message has been sent.');
    cy.tick(3000);
    cy.get('[class^="Messenger_success"]').should('not.exist');
  });

  it('Limpa todos os campos do formulário do messenger ao preenchê-los, fechar o messenger e abri-lo novamente', () => {
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('#messenger-name').should('be.visible');
    cy.get('#messenger-name').type('John Doe');
    cy.get('#email').type('john.doe@example.com');
    cy.get('#message').type('Hello, I need support!');
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('[class^="Messenger_openCloseButton"]').click();
    cy.get('#messenger-name').should('have.value', '');
    cy.get('#email').should('have.value', '');
    cy.get('#message').should('have.value', '');
  });

  it('Mostra as colunas Nome da Empresa e Ação, e oculta as colunas ID, Indústria, Número de Funcionários e Tamanho em um viewport móvel', () => {
    cy.viewport(375, 667);
    cy.get('[data-testid="table"]').should('be.visible');
    cy.contains('th', 'Company name').should('be.visible');
    cy.contains('th', 'Action').should('be.visible');
    cy.contains('th', 'ID').should('not.be.visible');
    cy.contains('th', 'Industry').should('not.be.visible');
    cy.contains('th', 'Number of employees').should('not.be.visible');
    cy.contains('th', 'Size').should('not.be.visible');
  });
});
