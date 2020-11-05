describe("Form test", () => {
    it("User Registration Form", () => {
        cy.visit('localhost:3000/register')
        cy.get('Form.Control[placeholder="Nombre"]')
        .type("testFirstName")
        cy.get('Form.Control[placeholder="Apellido"]')
        .type("testLastName")
        cy.get('Form.Control[placeholder="correo@ejemplo.com"]')
        .type("test@test.com")
        cy.get('Form.Control[placeholder="contraseña"]')
        .type("testPassword")
        cy.get('Form.Control[placeholder="Repetir contraseña"]')
        .type("testPassword")
        cy.get('Form.Control[placeholder="Ciudad"]')
        .type("testCiudad")
        cy.get('Form.Control[placeholder="Departamento"]')
        .type("testDepartamento")
        cy.get('Form.Control[placeholder="País"]')
        .type("testpais")
        cy.get('Form.Control[placeholder="DD/MM/AAAA"]')
        .type("1991-09-19")
        cy.get('Button[className="center"]').click()
        cy.on('window:alert',(txt)=>{
            should('Please check your email to verify your account')
        })
    });
});