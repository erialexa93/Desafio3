/// <reference types="cypress" />
import {LoginPage} from '../support/pages/loginPage';
import {HomePage} from '../support/pages/homePage';
import {ProductsPage} from '../support/pages/productsPage';
import {ShoppingCartPage} from '../support/pages/shoppingCartPage';
import {RegisterPage} from '../support/pages/registerPage';
//const constantes = require ('../support/constantes')

describe('Desafio_3', () => {
    let fixlogin;
    let fixproduct;
    const loginPage = new LoginPage;
    const homePage = new HomePage;
    const productsPage = new ProductsPage;
    const shoppingCartPage = new ShoppingCartPage;
    const registerPage = new RegisterPage;
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
        registerPage.clickLoginLink();
        loginPage.typeUser(fixlogin.login.user.username);
        loginPage.typePass(fixlogin.login.user.password);
        loginPage.clickLoginButton();
        homePage.clickOnlineShopLink();
    });
    
    it("Online Shop", () => {
        productsPage.clickAddButton(fixproduct.products.cap.name);
        productsPage.clickAddButton(fixproduct.products.jacket.name);
        productsPage.clickGoToShopButton();
        shoppingCartPage.verificarName(fixproduct.products.cap.name).invoke('text').then(texto => {
            assert.equal(texto, `${fixproduct.products.cap.name}`)
        });
        shoppingCartPage.verificarName(fixproduct.products.jacket.name).invoke('text').then(texto => {
            assert.equal(texto, `${fixproduct.products.jacket.name}`)
        });
        shoppingCartPage.verificarPrice(fixproduct.products.cap.price).invoke('text').then(texto => {
            assert.equal(texto, `$${fixproduct.products.cap.price}`)
        });
        shoppingCartPage.verificarPrice(fixproduct.products.jacket.price).invoke('text').then(texto => {
            assert.equal(texto, `$${fixproduct.products.jacket.price}`)
        });
        shoppingCartPage.clickShowTotalButton();
        sumProduct=fixproduct.products.cap.price+fixproduct.products.jacket.price;
        shoppingCartPage.returnTotalPrice(sumProduct).invoke('text').then(texto => {
            assert.equal(texto,`${sumProduct}`)
        });
    });

});