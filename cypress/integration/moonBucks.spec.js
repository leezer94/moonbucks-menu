/// <reference types="cypress" />

describe('Moonbucks Menu', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:5501/moonbucks-menu');
  });

  it('should display when right inputvalue is submitted', () => {
    cy.get('#menu-name').type('에스프레소');
    cy.get('#menu-submit-button').click();
    cy.get('.menu-list-item').should('contain', '에스프레소');
  });

  it('should be able to rename menu when user click on edit button', () => {
    cy.get('#menu-name').type('에스프레소');
    cy.get('#menu-submit-button').click();
    cy.get('.menu-list-item').should('contain', '에스프레소');

    cy.window().then(($win) => {
      cy.stub($win, 'prompt').returns('Chai Latte');
      cy.get('.menu-edit-button').click();
    });

    cy.get('.menu-list-item').should('contain', 'Chai Latte');
  });
});
