import globals from "globals";
import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
    js.configs.recommended,
    pluginReact.configs.flat.recommended,
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            globals: globals.browser,
            parserOptions: {
                ecmaFeatures: { jsx: true },
            },
        },
        rules: {
            "react/react-in-jsx-scope": "off",
            "react/prop-types": "off",
        },
    },
];
