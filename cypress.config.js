const { defineConfig } = require('cypress')

module.exports = defineConfig({
  retries: {
    runMode: 3,
    openMode: 0,
  },
  env: {},
  e2e: {
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      // return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: './cypress/e2e/**/*.cy.{js,jsx}',
  },
})
