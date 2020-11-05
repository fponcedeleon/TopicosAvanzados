describe("Form test", () => {
    it("User Registration Form", () => {
        cy.visit('localhost:3000/register')
        cy.get('input[name=firstName]')
        .type("testFirstName")
        cy.get('input[name=lastName]')
        .type("testLastName")
        cy.get('input[name=username]')
        .type("testUsername")
        cy.get('input[name=password]')
        .type("testPassword")
        cy.get('input[name=email]')
        .type("test@test.com")
        cy.get('input[name=city]')
        .type("testCity")
        cy.get('input[name=state]')
        .type("testState")
        cy.get('input[name=country]')
        .type("testCountry")
        cy.get('input[name=age]')
        .type("20")
        cy.get('form[name=formRegister]').submit()
        cy.contains('Submit').click()
        cy.on('window:alert',(txt)=>{
            should('Please check your email to verify your account')
        })
    });
});