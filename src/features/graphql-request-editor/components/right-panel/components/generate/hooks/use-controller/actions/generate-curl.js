export default function generateCurl(ctx) {
  const { headers, query, url, variables } = ctx

  return [
    "curl --request POST \\",
    "  --header 'Cache-Control: no-cache' \\",
    "  --header 'Content-Type: application/json' \\",
    ...Object.entries(JSON.parse(headers)).map(([key, value]) => `  --header '${key}: ${value}' \\`),
    `  --url ${url} \\`,
    `  --data '${JSON.stringify({ query, variables: variables ? JSON.parse(variables) : {} })}'`,
  ].join("\n")
}