const { defineConfig } = require("cypress");
const { Client } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        queryDatabase({ query, values }) {
          const client = new Client({
            host: 'localhost',   // Replace with your database host
            user: 'shreyanshjha',   // Replace with your database user
            password: 'admin', // Replace with your database password
            database: 'cypress-learn', // Replace with your database name
            port: 5432,          // Default PostgreSQL port
          });

          return client
              .connect()
              .then(() => client.query(query, values))
              .then((res) => {
                client.end();
                return res.rows; // Return the result rows
              })
              .catch((err) => {
                client.end();
                throw err; // Throw the error for Cypress to log
              });
        },
      });
    },
    specPattern: 'cypress/integration/**/*.{js,feature}'
  },
});
