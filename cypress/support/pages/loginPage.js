export class LoginPage {
    constructor() {
        this.user = "//input[@id='user']";
        this.pass = "//input[@id='pass']";
        this.loginButton = "//button[@id='submitForm']";
    };

    typeUser(username) {
        cy.xpath(this.user).type(username);
    };

    typePass(password) {
        cy.xpath(this.pass).type(password);
    };

    clickLoginButton() {
        cy.xpath(this.loginButton).click();
    };
};