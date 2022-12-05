/// <reference types="cypress" />
import {LoginPage} from '../support/pages/loginPage';
import {HomePage} from '../support/pages/homePage';
import {ProductsPage} from '../support/pages/productsPage';
import {ShoppingCartPage} from '../support/pages/shoppingCartPage';

describe('Desafio_3', () => {
    let fixlogin;
    let fixproduct;
    const loginPage = new LoginPage;
    const homePage = new HomePage;
    const productsPage = new ProductsPage;
    const shoppingCartPage = new ShoppingCartPage;
    let sumProduct;

    before('Fixture/Datos', () => {
        cy.fixture("Desafio3_Login").then(data => {
            fixlogin = data;
        });
        cy.fixture("Desafio3_Product").then(data => {
            fixproduct = data;
        });
    });
    
    beforeEach("Precondiciones", () => {
        cy.visit('');
        cy.xpath("//span[@id='registertoggle']").dblclick();
        loginPage.typeUser(fixlogin.login.user.username);
        loginPage.typePass(fixlogin.login.user.password);
        loginPage.clickLoginButton();
        cy.wait(1500);
        homePage.clickOnlineShopLink();
    });
    
    it("Online Shop", () => {
        productsPage.clickAddButton(`//button[@type='button' and @value='${fixproduct.products.cap.name}']`);
        productsPage.clickCloseButton();
        productsPage.clickAddButton(`//button[@type='button' and @value='${fixproduct.products.jacket.name}']`);
        productsPage.clickCloseButton();
        productsPage.clickGoToShopButton();
        shoppingCartPage.verificarName(`//p[@id='productName' and @name='${fixproduct.products.cap.name}']`).invoke('text').then(texto => {
            assert.equal(texto, `${fixproduct.products.cap.name}`)
        });
        shoppingCartPage.verificarName(`//p[@id='productName' and @name='${fixproduct.products.jacket.name}']`).invoke('text').then(texto => {
            assert.equal(texto, `${fixproduct.products.jacket.name}`)
        });
        shoppingCartPage.verificarPrice(`//p[@id='productPrice' and @name='${fixproduct.products.cap.price}']`).invoke('text').then(texto => {
            assert.equal(texto, `$${fixproduct.products.cap.price}`)
        });
        shoppingCartPage.verificarPrice(`//p[@id='productPrice' and @name='${fixproduct.products.jacket.price}']`).invoke('text').then(texto => {
            assert.equal(texto, `$${fixproduct.products.jacket.price}`)
        });
        shoppingCartPage.clickShowTotalButton();
        sumProduct=fixproduct.products.cap.price+fixproduct.products.jacket.price;
        shoppingCartPage.returnTotalPrice(`//p[@id='price']//parent::b[text()='${sumProduct}']`).invoke('text').then(texto => {
            assert.equal(texto,`${sumProduct}`)
        });
    });

});