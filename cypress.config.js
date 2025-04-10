const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: false,
    fixturesFolder: false,
    env: {
      apiUrl: "http://localhost:3001"
    },
  },
})
