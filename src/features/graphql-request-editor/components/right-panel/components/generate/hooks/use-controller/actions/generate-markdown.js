export default function generateMarkdown(ctx) {
  const { includeResponse, query, response, url, variables } = ctx
  return [
    `URL: ${url}`,
    "",
    "```graphql",
    query,
    "```",
    "",
    "Variables:",
    "```json",
    variables,
    "```",
    "",
    ...(includeResponse ? ["Response:", "```json", response, "```"] : []),
  ].join("\n")
}
