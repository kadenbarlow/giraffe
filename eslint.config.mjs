import eslintPluginPerfectionist from "eslint-plugin-perfectionist"
import eslintPluginReact from "eslint-plugin-react"
import eslintPluginReactHooks from "eslint-plugin-react-hooks"
import eslintPluginSortDestructureKeys from "eslint-plugin-sort-destructure-keys"
import eslint from "@eslint/js"

export default [
  eslint.configs.recommended,
  eslintPluginReact.configs.flat.recommended,
  {
    languageOptions: {
      globals: {
        AbortController: "readonly",
        clearTimeout: "readonly",
        console: "readonly",
        fetch: "readonly",
        process: "readonly",
        setTimeout: "readonly",
      },
    },
    plugins: {
      perfectionist: eslintPluginPerfectionist,
      react: eslintPluginReact,
      "react-hooks": eslintPluginReactHooks,
      "sort-destructure-keys": eslintPluginSortDestructureKeys,
    },
    rules: {
      "no-debugger": "error",
      "perfectionist/sort-named-exports": "error",
      "perfectionist/sort-objects": "error",
      "react/jsx-sort-props": "error",
      "react/prop-types": "off",
      "sort-destructure-keys/sort-destructure-keys": "error",
      ...eslintPluginReactHooks.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
    }
  },
]
