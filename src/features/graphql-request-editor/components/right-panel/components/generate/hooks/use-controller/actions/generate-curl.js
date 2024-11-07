import removeKey from "#lib/remove-key.js"
import safelyFormatGraphql from "#lib/safely-format-graphql.js"

export default async function generateCurl(ctx) {
  const { headers, query, url, variables } = ctx

  const parsedVariables = variables ? removeKey(JSON.parse(variables), "__typename") : {}

  return [
    "curl --request POST \\",
    "  --header 'Cache-Control: no-cache' \\",
    "  --header 'Content-Type: application/json' \\",
    ...Object.entries(JSON.parse(headers)).map(([key, value]) => `  --header '${key}: ${value}' \\`),
    `  --url ${url} \\`,
    `  --data '${JSON.stringify({ query: await safelyFormatGraphql(query), variables: parsedVariables })}'`,
  ].join("\n")
}
