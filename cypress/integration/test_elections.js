describe("Form test", () => {
    beforeEach(() => {
        cy.visit('https://topicossw.herokuapp.com/elections')
    })

    it("Can fill the form", () => {
        cy.get('input[name="nameEl"]')
        .type("election_test")
        cy.get('input[name="startDate"]')
        .type("12/28/2020")
        cy.get('input[name="startDateHr"]')
        .type("09:00")
        cy.get('input[name="endDate"]')
        .type("01/28/2021")
        cy.get('input[name="endDateHr"]')
        .type("09:00")
        cy.get('input[name="minAge"]')
        .type("20")
        cy.get('input[name="maxAge"]')
        .type("30")
        cy.get('input[name="city"]')
        .type("Montevideo")
        cy.get('input[name="country"]')
        .type("Uruguay")
        cy.get('input[name="proposalName"]')
        .type("TestProposal")
        cy.get('input[name="proposalDescription"]')
        .type("TestPropDescription")
        cy.get('input[name="optionOne"]')
        .type("TestOptionOne")
        cy.get('input[name="optionTwo"]')
        .type("TestOptionTwo")
        cy.get('form[name="formElection"').submit();
        cy.url().should('include', '/elections')
    });
});

