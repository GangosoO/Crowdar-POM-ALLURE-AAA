const { defineConfig } = require("cypress");
const allureWriter = require('@shelex/cypress-allure-plugin/writer');

module.exports = defineConfig({
  allowCypressEnv: true,
  screenshotOnRunFailure: true,
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports',
    charts: true,
    reportPageTitle: 'Crowdar',
    embeddedScreenshots: true,
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      allureWriter(on, config);
      return config; 
    },
    baseUrl: 'https://www.saucedemo.com/',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,

    env: {
      endpoint: {
        homePage: '/',
        home: '/inventory.html',
      },
    },
  },
});
