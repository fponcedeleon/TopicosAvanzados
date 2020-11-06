describe("Form test", () => {
    it("Login form", () => {
        cy.visit('https://topicos2020.netlify.app')
        cy.get('input[id=userText]')
        .type("topicossw2020@gmail.com")
        cy.get('input[id=passwordText]')
        .type("topicos_2020")
        cy.get('Button[type=Submit').click()
        cy.wait(3000)
        cy.get('a[href*="voting"]').should('be.visible')
    });
});