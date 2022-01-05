/// <reference types="Cypress" />
describe("purchase order generator test", () => {
  it("visits the root", () => {
    cy.visit("/");
  });
  it("clicks the menu button po option", () => {
    cy.get("mat-icon").click();
    cy.contains("a", "generator").click();
  });
  it("selects an vender", () => {
    // bit of a hack for timing issue
    cy.wait(500);
    cy.get('mat-select[formcontrolname="vendorid"]').click().type("{esc}");
    cy.wait(500);
    cy.get('mat-select[formcontrolname="vendorid"]').click();
    cy.contains("Friesen").click();
  });
  it("selects a product", () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="productid"]').click().type("{esc}");
    cy.wait(500);
    cy.get('mat-select[formcontrolname="productid"]').click();
    cy.contains("Nexus Notebooks").click();
  });
  it("selects a quantity (EOQ)", () => {
    cy.wait(500);
    cy.get('mat-select[formcontrolname="quantityid"]').click().type("{esc}");
    cy.wait(500);
    cy.get('mat-select[formcontrolname="quantityid"]').click();
    cy.get("mat-option").contains("EOQ").click();
  });
  it("clicks the save button", () => {
    cy.get("button").contains("Add PO").click();
  });
  it("confirms report created", () => {
    cy.contains("created!");
  });
});
