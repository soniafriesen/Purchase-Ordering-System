/// <reference types="Cypress" />
describe("vendor update test", () => {
  it("visits the root", () => {
    cy.visit("/");
  });
  it("clicks the menu button vendors option", () => {
    cy.get("mat-icon").click();
    cy.contains("a", "vendors").click();
  });
  it("selects Tester", () => {
    cy.contains("Tester").click();
  });
  it("updates email", () => {
    cy.get("[type='email']").clear();
    cy.get("[type='email']").type("myemail@domain.com");
  });
  it("submits the update", () => {
    cy.get("form").submit();
  });
  it("confirms update", () => {
    cy.contains("updated!");
  });
});
