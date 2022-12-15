export class ReceiptPage {
    constructor() {
        this.thanksButton = "//button[text()='Thank you']";
    };

    verificarName_CheckOut(name){
        return cy.xpath(`//p[text()='${name}']`,{timeout:10000})
    };

    verificarLastName(lastName){
        return cy.xpath(`//p[text()='${lastName}']`)
    };

    verificarProducts(products){
        return cy.xpath(`//p[text()='${products}']`)
    };

    verificarCardNumber(cardNumber){
        return cy.xpath(`//p[text()='${cardNumber}']`)
    };

    verificarTotalPrice(totalprice){
        return cy.xpath(`//p[text()='${totalprice}']`)
    };
};