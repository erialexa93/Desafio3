export class ReceiptPage {
    constructor() {
        this.thanksButton = "//button[text()='Thank you']";
        this.progressBar = "//div[@role='progressbar']";
    };

    esperaBarra(){
       return cy.xpath(this.progressBar,{timeout:10000})
    }

    verificarName_CheckOut(name){
        return cy.xpath(`//p[text()='${name}']`)
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