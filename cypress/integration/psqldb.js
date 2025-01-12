// <reference types='Cypress' />
describe('Database Integration', () => {
    it('Fetches data from PostgreSQL', () => {
        const query = `SELECT * FROM "Persons"`;
        //const values = ['123e4567-e89b-12d3-a456-426614174000'];
        const values = [];

        cy.task('queryDatabase', { query, values }).then((result) => {
            console.log(result);
            // Ensure at least one record is returned
            expect(result).to.have.length(2);

            // Validate properties of the returned record
            expect(result[0]).to.have.property('firstName', 'Rahul');
        });
    });
})