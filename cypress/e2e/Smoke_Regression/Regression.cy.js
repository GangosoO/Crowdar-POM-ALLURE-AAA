const { logingPage } = require('../../support/POM/LoginPage.js')
const { carritoPage } = require('../../support/POM/Carrito.de.compras.js')
const {homePage, home} = Cypress.env('endpoint')

describe ('Regression Test | Validar que los cambios no rompieron funcionalidades existentes', () => {

    beforeEach (() => {
        //Arrange
        cy.visit('/')
        //Assert
        cy.url().should("contain", homePage)
    })


    it('Ingresar en el campo Username un Espacio despues de ingresar el Usuario', () => {
        //Act
        logingPage.EspacioEnUsername()
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this servic').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Ingresar en el campo Password un Espacio despues de ingresar la Contraseña', () => {
        //Act
        logingPage.EspacioEnPassword()
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Hacer login con Username en Blanco', () => {
        //Act
        logingPage.userNameBlanco()
        //Assert
        cy.contains('Epic sadface: Username is required').should('have.text', 'Epic sadface: Username is required')
    })

    it('Hacer login con Password en Blanco', () => {
        //Act
        logingPage.passwordBlanco()
        //Assert
        cy.contains('Epic sadface: Password is required').should('have.text', 'Epic sadface: Password is required')
    })

    it('Hacer login en Blanco', () => {
        //Act
        logingPage.LoginBlanco()
        //Assert
        cy.contains('Epic sadface: Username is required').should('have.text', 'Epic sadface: Username is required')
    })

    it('Ingresar un Usuario invalido', () => {
        //Act
        logingPage.UsuarioInvalido()
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Ingresar un password invalido', () => {
        //Act
        logingPage.PasswordInvalido()
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Login con usuario performance_glitch_user', () => {
        //Act
        logingPage.UsuarioPerformanceGlitch()
        //Assert
        cy.contains('Swag Labs').should('be.visible')
    })

    it('Username con case sensitive', () => {
        //Act
        logingPage.UsernameCaseSensitive()
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Password con case sensitive', () => {
        //Act
        logingPage.PasswordCaseSensitive()
        //Assert
        cy.contains('Epic sadface: Username and password do not match any user in this service').should('have.text', 'Epic sadface: Username and password do not match any user in this service')
    })

    it('Agregar un producto al carrito', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.AddToCart()
        cy.clearCookies()
        cy.clearLocalStorage()
    })

    it('Verificando en la pantalla Checkout', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.Checkout()     
    })

    it('Checkout ingresando datos de usuario validos', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.YourInformation()    
    })

    it('Finalizar la compra con datos de usuario validos', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.YourInformation()
        carritoPage.FinishPurchase()

        //Assert
        cy.contains('Thank you for your order!').should('be.visible')
        cy.contains('Your order has been dispatched, and will arrive just as fast as the pony can get there!').should('be.visible')
    })
})          