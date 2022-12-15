export class CheckOutPage {
    constructor() {
        this.name = "//input[@id='FirstName']";
        this.last_name = "//input[@id='lastName']";
        this.card_number = "//input[@id='cardNumber']";
        this.purchaseButton = "//button[text()='Purchase']";
    };

    typeName(name) {
        cy.xpath(this.name).type(name);
    };

    typeLastName(lastname) {
        cy.xpath(this.last_name).type(lastname);
    };

    typeCardNumber(cardnumber) {
        cy.xpath(this.card_number).type(cardnumber);
    };

    clickPurchaseButton() {
        cy.xpath(this.purchaseButton).click();
    };
};