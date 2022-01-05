/// <reference types="Cypress" />
describe("home page test", () => {
  it("visits the home page", () => {
    cy.visit("/");
  });
});
