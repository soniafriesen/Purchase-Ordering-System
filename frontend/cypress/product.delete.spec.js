/// <reference types="Cypress" />
describe("product delete test", () => {
  it("visits the root", () => {
    cy.visit("/");
  });
  it("clicks the menu button products option", () => {
    cy.get("mat-icon").click();
    cy.contains("a", "products").click();
  });
  it("selects Product 35Y53", () => {
    cy.contains("35Y53").click();
  });
  it("clicks the delete button", () => {
    cy.get("button").contains("Delete").click();
  });
  it("confirms delete", () => {
    cy.contains("deleted!");
  });
});
