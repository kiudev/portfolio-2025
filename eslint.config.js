import eslintPluginAstro from "eslint-plugin-astro";
export default [
  // add more generic rule sets here, such as:
  // js.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      // override/add rules settings here, such as:
      // "astro/no-set-html-directive": "error"
    },
    files: ["*.astro"],
    parser: "astro-eslint-parser",
    parserOptions: {
      parser: "@javascript-eslint/parser",
      extraFileExtensions: [".astro"],
    },
  },
];
