describe("Form test", () => {
    it("Login form", () => {
        cy.visit('localhost:3000')
        cy.get('input[id=userText]')
        .type("alvaropardo@live.com")
        cy.get('input[id=passwordText]')
        .type("45986382")
        cy.get('Button[type=Submit').click()
        cy.wait(3000)
        cy.get('a[href*="voting"]').should('be.visible')
    });
});