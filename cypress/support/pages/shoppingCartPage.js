export class ShoppingCartPage {
    constructor() {
        this.goToProductsButton = "//h2[starts-with(text(),'Shopping')]//following-sibling::button[text()='Go to products']";
        //this.removeButton = "//p[starts-with(text(),'R')]//following-sibling::button[text()='Remove']";
        this.showTotalButton = "//div[@class='css-n1d5pa']//parent::button[text()='Show total price']";
        this.checkoutButton = "//div[@class='css-641vkz']//parent::button[text()='Go to Checkout']";
    };

    verificarName(name){
        return cy.xpath(`//p[@id='productName' and @name='${name}']`)
    };

    verificarPrice(price){
        return cy.xpath(`//p[@id='productPrice' and @name='${price}']`)
    };

    clickShowTotalButton() {
        cy.xpath(this.showTotalButton).click();
    };

    returnTotalPrice(totalprice){
        return cy.xpath(`//p[@id='price']//parent::b[text()='${totalprice}']`)
    };

    clickCheckOutButton() {
        cy.xpath(this.checkoutButton).click();
    }
};