const { defineConfig } = require("cypress");
const { Client } = require('pg');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        queryDatabase({ query, values }) {
          const client = new Client({
            host: 'localhost',   // Replace with your database host
            user: 'postgres',   // Replace with your database user
            password: '$Triple8128$', // Replace with your database password
            database: 'shreyanshjha', // Replace with your database name
            port: 5433,          // Default PostgreSQL port
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
