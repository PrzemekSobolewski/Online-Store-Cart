module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "plugin:react-redux/recommended",
        "plugin:jest-dom/recommended",
        "plugin:testing-library/react"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "react-hooks",
        "prettier",
        "react-redux",
        "jest-dom",
        "testing-library"
    ],
    "rules": {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "warn",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "prettier/prettier": "error",
        "react-redux/connect-prefer-named-arguments": 2,
        "jest-dom/prefer-checked": "error",
        "jest-dom/prefer-enabled-disabled": "error",
        "jest-dom/prefer-required": "error",
        "jest-dom/prefer-to-have-attribute": "error",
        "testing-library/await-async-query": "error",
        "testing-library/no-await-sync-query": "error",
        "testing-library/no-debug": "warn",
        "testing-library/no-dom-import": "off",
        "testing-library/prefer-screen-queries": "off"
    },
    "settings": {
        "react": {
            "version": 'detect'
        },
    },
    "overrides": [
        {
          "files": [
            "**/*.test.js",
            "**/*.test.jsx"
          ],
          "env": {
            "jest": true
          }
        }
      ]
};
