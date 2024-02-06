// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('loginRegUser', () => {
    cy.visit('http://localhost:3000');

        cy.contains('Log In').click();
        cy.get('#email').type('joji@gmail.com');
        
        cy.get('#password').type('a');
        
        cy.contains('Log In').click();


})

Cypress.Commands.add('loginRegUser2', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Log In').click();
    cy.get('#email').type('adi@gmail.com');
    cy.get('#password').type('a');
    cy.contains('Log In').click();
})


Cypress.Commands.add('loginGuestUser', () => {
    cy.visit('http://localhost:3000');

        cy.contains('Guest').click();
        
})



//log in register

//log in guest user mood




Cypress.Commands.add('loginRegHighRepUser', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Log In').click();
    cy.get('#email').type('dev@gmail.com');
    cy.get('#password').type('a');
    cy.contains('Log In').click();


})


Cypress.Commands.add('loginRegLowRepUser', () => {
    cy.visit('http://localhost:3000');
    cy.contains('Log In').click();
    cy.get('#email').type('ad.8@gmail.com');
    cy.get('#password').type('a');
    cy.contains('Log In').click();


})

