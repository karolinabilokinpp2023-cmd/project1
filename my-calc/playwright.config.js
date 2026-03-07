const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests/e2e',
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    headless: true,

    screenshot: 'on',     // робить скріншоти
    video: 'on',          // записує відео
    trace: 'on'           // записує детальний trace
  }
});