describe("Form test", () => {
    it("Login form", () => {
        cy.visit('localhost:3000')
        cy.get('input[id=userText]')
        .type("topicossw2020@gmail.com")
        cy.get('input[id=passwordText]')
        .type("topicos_2020")
        cy.get('Button[type=Submit').click()
        cy.wait(3000)
        cy.get('div[class="grid-votaciones"] a').first().click()
        cy.get('button').click()
        cy.on('window:alert',(txt)=>{
            should('Has votado correctamente.')
        })
    });
});