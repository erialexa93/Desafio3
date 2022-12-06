export class ProductsPage {
    constructor() {
        this.closeButton = "//button[@type='button' and @id='closeModal']";
        this.goToShopButton = "//button[@id='goShoppingCart']";
    };

    clickAddButton(product) {
        cy.xpath(`//button[@type='button' and @value='${product}']`).click();
        cy.xpath(this.closeButton).click();
    };

    clickGoToShopButton() {
        cy.xpath(this.goToShopButton).click();
    };
};