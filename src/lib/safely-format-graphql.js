import prettier from "prettier"

export default async function safelyFormatGraphql(graphql) {
  try {
    return await prettier.format(graphql, { parser: "graphql" })
  } catch (error) {
    return null
  }
}
