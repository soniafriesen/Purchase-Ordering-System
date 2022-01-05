/// <reference types="Cypress" />
describe("vendor add test", () => {
  it("visits the root", () => {
    cy.visit("/");
  });
  it("clicks the menu button vendors option", () => {
    cy.get("mat-icon").click();
    cy.contains("a", "vendors").click();
  });
  it("clicks add icon", () => {
    cy.contains("control_point").click();
  });
  it("fills in fields", () => {
    cy.get("input[formcontrolname=name").type("Vendor Tester");
    cy.get("input[formcontrolname=email").type("testeremail@abc.ca");
    cy.get("input[formcontrolname=phone").type("555-648-6515");
    cy.get("input[formcontrolname=address1").type("24 random street");
    cy.get("input[formcontrolname=city").type("London");
    cy.get("mat-select[formcontrolname=province")
      .click()
      .get("mat-option")
      .contains("Ontario")
      .click();
    cy.get("input[formcontrolname=postalcode").type("N6C 0B2");
    cy.get("mat-select[formcontrolname=type")
      .click()
      .get("mat-option")
      .contains("Trust")
      .click();
  });
  it("submits the data", () => {
    cy.get("form").submit();
  });
  it("confirms add", () => {
    cy.contains("added!");
  });
});
