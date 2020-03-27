describe("Testing User Interaction with form", function() {
    beforeEach(function() {
        cy.visit('http://localhost:3000'); 
    })

    it("Completes the 3 fields of name email and reason", function() {
        cy.get("input[name='name']")
            .type("Andrew The Greatest")
            .should("have.value","Andrew The Greatest"); 
        cy.get("input[name='email']")
            .type("Federico@gmail.com")
            .should("have.value", "Federico@gmail.com"); 
        cy.get("input[name='password']")
            .type("Calibre51@")
            .should("have.value", "Calibre51@"); 
        cy.get("input[name='benchpress']")
            .type("366")
            .should("have.value", "366"); 
        cy.get("input[name='pullups']")
            .type("200")
            .should("have.value", "200"); 
        cy.get("input[name='squat']")
            .type("500")
            .should("have.value", "500"); 
        cy.get("[type='checkbox']")
            .check()
            .should("be.checked"); 
        cy.get("button").click(); 
    })
})