describe('API SauceDemo - disponibilidad del sitio', () => {

  it('Debería responder 200 al hacer GET /', () => {
    cy.request({
      method: 'GET',
      url: '/',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('Debería exponer correctamente el formulario de login', () => {
    cy.request({
      method: 'GET',
      url: '/',
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(200);

      const html = response.body;

      expect(response.status).to.eq(200);
      expect(html).to.contain('/static/js/main');
      expect(html).to.contain('/static/css/main');
      expect(html).to.contain('<div id="root"></div>');
    });
  });
});