// eslint.config.js  (ESLint v9 flat config)
import js from "@eslint/js";
import globals from "globals";

export default [
    js.configs.recommended,
    {
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: "commonjs",
            globals: {
                ...globals.node,
            },
        },
        rules: {
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": "off",
            "semi": ["error", "always"],
            "quotes": ["error", "double"],
            "eqeqeq": ["error", "always"],
            "no-var": "error",
            "prefer-const": "error",
        },
    },
];
