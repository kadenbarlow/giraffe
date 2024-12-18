import removeKey from "#lib/remove-key.js"
import safelyFormatGraphql from "#lib/safely-format-graphql.js"
import safelyParseJson from "#lib/safely-parse-json.js"

export default async function generateMarkdown(ctx) {
  const { includeResponse, query, response, url, variables } = ctx
  return [
    `URL: ${url}`,
    "",
    "```graphql",
    await safelyFormatGraphql(query),
    "```",
    "",
    "Variables:",
    "```json",
    JSON.stringify(removeKey(safelyParseJson(variables), "__typename") || {}, null, 2),
    "```",
    "",
    ...(includeResponse ? ["Response:", "```json", response, "```"] : []),
  ].join("\n")
}
