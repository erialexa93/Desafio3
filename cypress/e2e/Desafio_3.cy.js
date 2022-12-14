/// <reference types="cypress" />
import {HomePage} from '../support/pages/homePage';
import {ProductsPage} from '../support/pages/productsPage';
import {ShoppingCartPage} from '../support/pages/shoppingCartPage';
import {CheckOutPage} from '../support/pages/checkOutPage';
import {ReceiptPage} from '../support/pages/receiptPage';
const constantes = require ('../support/constantes')

describe('Desafio_3', () => {
    let fixcheckout;
    let fixproduct;
    const homePage = new HomePage;
    const productsPage = new ProductsPage;
    const shoppingCartPage = new ShoppingCartPage;
    const checkOutPage = new CheckOutPage;
    const receiptPage = new ReceiptPage;
    let sumProduct;

    before('Fixture/Datos', () => {
        cy.fixture("Desafio3_Product").then(datap => {
            fixproduct = datap;
        });
        cy.fixture("Desafio3_Checkout").then(datac => {
            fixcheckout = datac;
        });
    });
    
    it("Online Shop", () => {
        cy.request({
            url: constantes.API.URL_POST_REGISTER,
            method: "POST",
            body: {
                username: constantes.REGISTRO.USER,
                password: constantes.REGISTRO.PASS,
                gender: constantes.REGISTRO.GENDER,
                day: constantes.REGISTRO.DAY,
                month: constantes.REGISTRO.MONTH,
                year: constantes.REGISTRO.YEAR
            }
        }).then(respuesta => {
            expect(respuesta.status).is.equal(200)
            expect(respuesta.body.newUser.username).is.equal(constantes.REGISTRO.USER)

            cy.request({
                url: constantes.API.URL_POST_LOGIN,
                method: "POST",
                body: {
                    username: constantes.REGISTRO.USER,
                    password: constantes.REGISTRO.PASS,
                }
            }).then(respuesta => {
                expect(respuesta.status).is.equal(200)
                window.localStorage.setItem('token',respuesta.body.token);
                window.localStorage.setItem('user', respuesta.body.user.username)
            });
        });
        cy.visit('');
        homePage.clickOnlineShopLink();
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
        shoppingCartPage.clickCheckOutButton();
        checkOutPage.typeName(fixcheckout.checkout.data.name);
        checkOutPage.typeLastName(fixcheckout.checkout.data.last_name);
        checkOutPage.typeCardNumber(fixcheckout.checkout.data.card_number);
        checkOutPage.clickPurchaseButton();
        receiptPage.verificarName_CheckOut(fixcheckout.checkout.data.name).should('have.text',`${fixcheckout.checkout.data.name} ${fixcheckout.checkout.data.last_name} ${constantes.MENSAJES.MENSAJE_RECEIPT_OK}`);
        receiptPage.verificarProducts(fixproduct.products.cap.name).should('have.text',`${fixproduct.products.cap.name}`);
        receiptPage.verificarProducts(fixproduct.products.jacket.name).should('have.text',`${fixproduct.products.jacket.name}`);
        receiptPage.verificarCardNumber(fixcheckout.checkout.data.card_number).should('have.text',`${fixcheckout.checkout.data.card_number}`);
        receiptPage.verificarTotalPrice(sumProduct).should('have.text',`${constantes.MENSAJES.MENSAJE_RECEIPT_PRICE}${sumProduct}`);       

    });

    after('Eliminar Usuario', () => {
        cy.request({
            url: `${constantes.API.URL_DELETE_USER}${constantes.REGISTRO.USER}`,
            method: "DELETE"
        }).then(respuesta => {
            expect(respuesta.status).is.equal(200)
            expect(respuesta.body.user.username).is.equal(constantes.REGISTRO.USER)
        });
    });
});