describe('EmailText parser end to end UI test', () => {
    beforeEach(() =>{
        cy.visit ("http://localhost:5173/");
    });

    it('valid input and output', () => { // Submit click
        cy.get('input[name = "TaxRate"]').type(15); // Tax Rate
        cy.get('input[name = "EmailOrTextInput"]').type('<expense><cost_centre>DEV632</cost_centre><total>35,000</total><payment_method>personal card</payment_method></expense>'); //Email/Text input
        cy.get('button').contains('Submit').click(); // submit button click
        cy.get('.output').should('exist');

        cy.get('.output').contains('"total": 35000');
        cy.get('.output').contains('"costCentre": "DEV632"');
    });

    it('show error when no tax rate given', () => { // Submit click
        cy.get('button').contains('Submit').click(); // submit button click

        cy.get('.error').should('contain','Valid Tax Rate is required');
    });

    it('show error when total is missing', () =>{
      cy.get('input[name ="TaxRate"]').type(15);
        cy.get('input[name = "EmailOrTextInput"]').type('<expense><cost_centre>DEV632</cost_centre><total></total><payment_method>personal card</payment_method></expense>'); // total value is missing
        cy.get('button').contains('Submit').click();

        cy.get('.error').should('contain','Total is missing, rejecting this input');
    });

    it('show UNKNOWN when cost_centre value is missing', () =>{
        cy.get('input[name ="TaxRate"]').type(15);
        cy.get('input[name ="EmailOrTextInput"]').type('<expense><cost_centre></cost_centre><total>35,000</total><payment_method>personal card</payment_method></expense>'); // cost_centre value is empty
        cy.get('button').contains('Submit').click();
        cy.get('.output').should('exist');

        cy.get('.output').contains('"costCentre": "UNKNOWN"');
    });

    it('when XML is invalid reject the input', () =>{
        cy.get('input[name = "TaxRate"]').type(15);
        cy.get('input[name ="EmailOrTextInput"]').type('<expense><cost_centre>DEV632</cost_centre><total>35,000</total><payment_method>personal card</payment_method>'); // expense is missing closing tag
        cy.get('button').contains('Submit').click();
        cy.get('.error').should('contain', 'Invalid or Malformed XML. Input is rejected');
    });

    it('when clear button is clicked', () =>{ // Clear click
        cy.get('input[name = "TaxRate"]').type(15); // Tax Rate
        cy.get('input[name = "EmailOrTextInput"]').type('<expense><cost_centre>DEV632</cost_centre><total>35,000</total><payment_method>personal card</payment_method></expense>'); //Email/Text input
        cy.get('button').contains('Clear').click();

        cy.get('input[name = "TaxRate"]').should('have.value', '');
        cy.get('input[name = "EmailOrTextInput"]').should('have.value', '');
        cy.get('.error').should('not.exist');
        cy.get('.output').should('not.exist');
    });
})