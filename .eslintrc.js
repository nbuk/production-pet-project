module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "standard-with-typescript",
    "plugin:react/jsx-runtime",
    "plugin:i18next/recommended",
    "plugin:storybook/recommended",
    "plugin:react-hooks/recommended",
  ],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: "./tsconfig.json",
  },
  ignorePatterns: ["src/**/*.test.tsx?"],
  plugins: ["react", "i18next"],
  rules: {
    indent: [2, 2],
    quotes: [
      2,
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    "jsx-indent": "off",
    "@typescript-eslint/quotes": [2, "double"],
    "@typescript-eslint/semi": [2, "always"],
    "@typescript-eslint/strict-boolean-expressions": "off",
    "@typescript-eslint/no-floating-promises": "off",
    semi: [2, "always"],
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/member-delimiter-style": [
      2,
      {
        multiline: {
          delimiter: "semi",
          requireLast: true,
        },
        singleline: {
          delimiter: "semi",
          requireLast: true,
        },
      },
    ],
    "@typescript-eslint/space-before-function-paren": [2, "never"],
    "comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/comma-dangle": ["error", "always-multiline"],
    "@typescript-eslint/consistent-type-assertions": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/display-name": "off",
    "@typescript-eslint/no-dynamic-delete": "off",
    "@typescript-eslint/return-await": "off",
  },
  globals: {
    __IS_DEV__: true,
  },
};
