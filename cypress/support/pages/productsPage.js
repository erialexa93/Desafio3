export class ProductsPage {
    constructor() {
        this.closeButton = "//button[@type='button' and @id='closeModal']";
        this.goToShopButton = "//button[@id='goShoppingCart']";
    };

    clickAddButton(product) {
        cy.xpath(product).click();
    };

    clickCloseButton() {
        cy.xpath(this.closeButton).click();
    };

    clickGoToShopButton() {
        cy.xpath(this.goToShopButton).click();
    };
};