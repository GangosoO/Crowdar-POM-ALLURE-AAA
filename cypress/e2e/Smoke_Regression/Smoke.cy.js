const { logingPage } = require('../../support/POM/LoginPage.js')
const { carritoPage } = require('../../support/POM/Carrito.de.compras.js')


describe ('Smoke Test | Validar si el Sistema es funcionale stable', () => {

    beforeEach (() => {
        //Arrange
        cy.visit('/')
    })

    it('Login exitoso con credenciales válidas', () => {
        //Act
        logingPage.UsuarioValido()
        //Assert
        cy.contains('Swag Labs').should('be.visible')
    })

    it('Login error con credenciales válidas', () => {
        //Act
        logingPage.UsuarioValido()
        //Assert
        cy.contains('Swag Labss').should('contain', 'Swag Labs')
    })

    it('Login exitoso con credenciales válidas y luego desloguear', () => {
        //Act
        logingPage.UsuarioValido()
        //Assert
        cy.contains('Swag Labs').should('be.visible')
        logingPage.Desloguear()
    })

    it('Ingresar un Usuario bloqueado', () => {
        //Act
        logingPage.UsuarioBlocked()
        //Assert
        cy.contains('Epic sadface: Sorry, this user has been locked out.').should('have.text', 'Epic sadface: Sorry, this user has been locked out.')
    })

    it('Acceso a URL protegida sin Login', () => {
        //Act
        logingPage.AccesoURLProtegidaSinLogin()
        //Assert
        cy.contains('Epic sadface: You can only access \'/inventory.html\' when you are logged in.').should('have.text', 'Epic sadface: You can only access \'/inventory.html\' when you are logged in.')
    })

    it('Agregar varios productos al carrito', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.AddToCartMultipleProducts()
    })

    it('Remover un producto del carrito desde products', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.RemoveFromCart()
    })

    it('Remover el carrito de compras desde shopping cart', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.RemoveShoppingCart()
    })

    it('En Checkout dejar los campos de usuario en blanco', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.Checkout()
        carritoPage.nextContinue()
        //Assert
        cy.contains('Error: First Name is required').should('contain', 'Error: First Name is required')
    })

    it('Finalizar la compra con datos de usuario validos y volver a la pantalla de productos', () => {
        //Act
        logingPage.UsuarioValido()
        carritoPage.YourInformation()
        carritoPage.FinishPurchase()
        carritoPage.BackToProducts()
    })
})