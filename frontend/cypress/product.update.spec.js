/// <reference types="Cypress" />
describe("product update test", () => {
  it("visits the root", () => {
    cy.visit("/");
  });
  it("clicks the menu button product option", () => {
    cy.get("mat-icon").click();
    cy.contains("a", "products").click();
  });
  it("selects Product 35Y53", () => {
    cy.contains("35Y53").click();
  });
  it("updates costprice", () => {
    cy.get("input[formcontrolname=costprice]").clear();
    cy.get("input[formcontrolname=costprice]").type("109.99");
  });
  it("submits the update", () => {
    cy.get("button").contains("Save").click();
  });
  it("confirms update", () => {
    cy.contains("updated!");
  });
});
