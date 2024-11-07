import removeKey from "#lib/remove-key.js"
import safelyFormatGraphql from "#lib/safely-format-graphql.js"
import safelyParseJson from "#lib/safely-parse-json.js"

export default async function generateRuby(ctx) {
  const { headers, query, url, variables } = ctx

  return [
    'require "uri"',
    'require "json"',
    'require "net/http"',
    "",
    `url = URI("${url}")`,
    "",
    "https = Net::HTTP.new(url.host, url.port)",
    'https.use_ssl = true if url.scheme == "https"',
    "",
    "request = Net::HTTP::Post.new(url)",
    'request["Cache-Control"] = "no-cache"',
    'request["Content-Type"] = "application/json"',
    ...Object.entries(JSON.parse(headers)).map(([key, value]) => `request["${key}"] = "${value}"`),
    "",
    `query = <<~GQL\n${await safelyFormatGraphql(query)}\nGQL`,
    "",
    `variables = <<~JSON\n${safelyParseJson(variables) ? JSON.stringify(removeKey(safelyParseJson(variables), "__typename"), null, 2) : {}}\nJSON`,
    "",
    "request.body = JSON.dump({ query: query, variables: variables })",
    "",
    "response = https.request(request)",
    "puts response.read_body",
  ].join("\n")
}
