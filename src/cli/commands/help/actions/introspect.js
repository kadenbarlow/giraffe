import { bold, command, example, option, section } from "#lib/help-format.js"

const INTROSPECT_HELP = [
  "Inspect a GraphQL schema without opening the TUI.",
  "",
  "Returns a list of available queries and mutations, or details the full query",
  "and variable types for a specific GraphQL operation.",
  "",
  "Usage: giraffe introspect [options...]",
  "",
  `$ ${command("giraffe introspect --url <url>")}`,
  `$ ${command("giraffe introspect --request <file>")}`,
  `$ ${command("giraffe introspect --url <url> --headers '{}' --type query|mutation")}`,
  `$ ${command("giraffe introspect --url <url> --headers '{}' --name <operation> --type query|mutation")}`,
  `$ ${command("giraffe introspect --request <file> --name <operation> --type query|mutation")}`,
  "",
  section(
    "Options:",
    [
      option("--collections", "Path to the collections directory"),
      option("--headers", "JSON object of request headers"),
      option("--name", "GraphQL field name to inspect in full"),
      option("--request", "Loads url, headers, and related options from a saved request JSON file"),
      option("--type", "Operation type filter: query | mutation"),
      option("--url", "GraphQL endpoint URL"),
    ].join("\n"),
  ),
  "",
  `${bold("Examples")}`,
  example("List all queries and mutations from a server", "giraffe introspect --url http://localhost:4000/graphql"),
  "",
  example(
    "Load the endpoint from a saved request and print the schema operations",
    "giraffe introspect --request collection/example.json",
  ),
  "",
  example("Limit output to query operations", "giraffe introspect --url http://localhost:4000/graphql --type query"),
  "",
  example(
    "Inspect a single query and print its generated query and variable types",
    "giraffe introspect --url http://localhost:4000/graphql --name viewer --type query",
  ),
  "",
  example(
    "Inspect a mutation using a saved request's url and headers",
    "giraffe introspect --request collection/example.json --name updateUser --type mutation",
  ),
  "",
].join("\n")

export default async function introspect() {
  process.stdout.write(`\n${INTROSPECT_HELP}\n`)
}
