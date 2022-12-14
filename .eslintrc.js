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
  ignorePatterns: ["src/**/*.test.tsx?", "src/**/*.stories.tsx"],
  plugins: ["react", "i18next", "feature-sliced-paths"],
  rules: {
    indent: "off",
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
    "@typescript-eslint/no-invalid-void-type": "off",
    "@typescript-eslint/no-unused-vars": [1],
    "n/no-callback-literal": "off",
    "feature-sliced-paths/path-checker": "error",
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
};
