describe("Form test", () => {
    beforeEach(() => {
        cy.visit('https://google.com')
    })

    it("Can fill the form", () => {
        
        cy.get('input[name="q"]')
        .type("test")
        cy.get('form[name="f"').submit();
        cy.url().should('include', 'google')
    });
});