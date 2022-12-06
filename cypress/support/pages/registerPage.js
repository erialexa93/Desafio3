export class RegisterPage {
    constructor() {
        this.loginLink = "//span[@id='registertoggle']";
    };

    clickLoginLink() {
        cy.xpath(this.loginLink).dblclick();
    };
};