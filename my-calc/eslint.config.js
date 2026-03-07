const js = require("@eslint/js");

module.exports = [
  js.configs.recommended,

  {
    files: ["src/**/*.js", "src/**/*.jsx"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        window: "readonly",
        document: "readonly",
        console: "readonly",
        process: "readonly",
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-console": "warn",
    },
  },

  {
    files: ["src/**/*.test.js"],
    languageOptions: {
      globals: {
        test: "readonly",
        expect: "readonly",
        jest: "readonly",
      },
    },
  },
];