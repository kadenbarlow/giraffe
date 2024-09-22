export default {
  importOrder: ["^[@]", "^[#]", "^[.]"],
  importOrderCaseInsensitive: true,
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  printWidth: 120,
  semi: false,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "all",
  useTabs: false,
}
