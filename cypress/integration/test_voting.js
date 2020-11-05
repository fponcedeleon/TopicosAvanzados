describe("Form test", () => {
    it("Login form", () => {
        cy.visit('localhost:3000')
        cy.get('input[id=userText]')
        .type("apardo")
        cy.get('input[id=passwordText]')
        .type("45986382")
        cy.get('Button[type=Submit').click()
        cy.wait(3000)
        cy.get('div[class="grid-votaciones"] a').first().click()
        cy.get('button').click()
        cy.on('window:alert',(txt)=>{
            should('Has votado correctamente.')
        })
    });
});