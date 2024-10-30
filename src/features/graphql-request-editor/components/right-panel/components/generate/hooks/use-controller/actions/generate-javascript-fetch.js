import safelyFormatGraphql from "#lib/safely-format-graphql.js"
import safelyParseJson from "#lib/safely-parse-json.js"

export default async function generateJavascriptFetch(ctx) {
  const { headers, query, url, variables } = ctx

  return [
    "const headers = new Headers();",
    'headers.append("Cache-Control", "no-cache");',
    'headers.append("Content-Type", "application/json");',
    ...Object.entries(JSON.parse(headers)).map(([key, value]) => `headers.append("${key}", "${value}");`),
    "",
    `const query = \`${await safelyFormatGraphql(query)}\``,
    `const variables = ${safelyParseJson(variables) ? JSON.stringify(safelyParseJson(variables), null, 2) : {}}`,
    "",
    "const requestOptions = {",
    "  body: JSON.stringify({ query, variables }),",
    "  headers,",
    '  method: "POST",',
    '  redirect: "follow",',
    "}",
    "",
    `fetch("${url}", requestOptions)`,
    "  .then((response) => response.json())",
    "  .then((result) => console.log(JSON.stringify(result, null, 2)))",
    "  .catch((error) => console.error(error))",
  ].join("\n")
}
