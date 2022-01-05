/// <reference types="Cypress" />
describe("product add test", () => {
  it("visits the root", () => {
    cy.visit("/");
  });
  it("clicks the menu button products option", () => {
    cy.get("mat-icon").click();
    cy.contains("a", "products").click();
  });
  it("clicks add icon", () => {
    cy.contains("control_point").click();
  });
  it("fills in fields", () => {
    cy.get('input[formcontrolname="id"]').type("35Y53");
    cy.get('mat-select[formcontrolname="vendorid"]').click();
    cy.get("mat-option").contains("Sonia").click();
    cy.get("input[formcontrolname=name]").type("Nexus Books");
    cy.get("input[formcontrolname=msrp]").type("5");
    cy.get("input[formcontrolname=costprice]").type("79.99");
    // close first panel which should be already open
    cy.get(".mat-expansion-indicator").eq(0).click();
    // open second panel which should be closed
    cy.get(".mat-expansion-indicator").eq(1).click();
    cy.get("input[formcontrolname=rop]").type("4");
    cy.get("input[formcontrolname=eoq]").type("8");
    cy.get("input[formcontrolname=qoh]").type("2");
    cy.get("input[formcontrolname=qoo]").type("1");
  });
  it("clicks the save button", () => {
    cy.get("button").contains("Save").click();
  });
  it("confirms add", () => {
    cy.contains("added!");
  });
});
