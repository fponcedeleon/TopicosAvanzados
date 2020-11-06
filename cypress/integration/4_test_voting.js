describe("Form test", () => {
    it("Login form", () => {
        cy.visit('https://topicos2020.netlify.app')
        cy.get('input[id=userText]')
        .type("topicossw2020@gmail.com")
        cy.get('input[id=passwordText]')
        .type("topicos_2020")
        cy.get('Button[type=Submit').click()
        cy.wait(3000)
        cy.get('a[href*="voting"]').click()
        cy.get('thead[class="thead-dark"]').first().get('a').eq(5).click()
        cy.get('button').click()
        cy.on('window:alert',(txt)=>{
           should('Has votado correctamente.')
        })
    });
});