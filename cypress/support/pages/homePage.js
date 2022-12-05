export class HomePage {
    constructor() {
        this.todoListLink = "//a[starts-with(@id,'todo')]";
        this.waitsLink = "//a[starts-with(@id,'waits')]";
        this.alertsLink = "//a[starts-with(@id,'alerts')]";
        this.formUtilsLink = "//a[starts-with(@id,'form')]";
        this.onlineShopLink = "//a[starts-with(@id,'online')]";
        this.fileUploadLink = "//a[starts-with(@id,'file')]";
    };

    clickTodoListLink() {
        cy.xpath(this.todoListLink).click();
    };

    clickWaitsLink() {
        cy.xpath(this.waitsLink).click();
    };

    clickAlertsLink() {
        cy.xpath(this.alertsLink).click();
    };

    clickFormUtilsLink() {
        cy.xpath(this.formUtilsLink).click();
    };

    clickOnlineShopLink() {
        cy.xpath(this.onlineShopLink).click();
    };

    clickFileUploadLink() {
        cy.xpath(this.fileUploadLink).click();
    };
};