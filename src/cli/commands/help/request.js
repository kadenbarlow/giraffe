import { bold, command, example, option, section } from "#lib/help-format.js"

const REQUEST_HELP = [
  "Execute GraphQL requests without opening the TUI.",
  "",
  "This command supports saved request execution, raw query execution, and",
  "schema-generated operations selected by name.",
  "",
  "Usage: giraffe request [options...]",
  "",
  `$ ${command("giraffe request --request <file>")}`,
  `$ ${command("giraffe request --request <file> --variables '{}'")}`,
  `$ ${command("giraffe request --url <url> --headers '{}' --query 'query { viewer { id } }' --variables '{}'")}`,
  `$ ${command("giraffe request --url <url> --headers '{}' --name <operation> --type query|mutation --variables '{}'")}`,
  `$ ${command("giraffe request --request <file> --name <operation> --type query|mutation --variables '{}'")}`,
  "",
  section(
    "Options:",
    [
      option("--collections", "Path to the collections directory"),
      option("--headers", "JSON object of request headers"),
      option("--name", "GraphQL field name to generate from the schema"),
      option("--query", "Raw GraphQL query or mutation string"),
      option("--request", "Loads options from path to a saved request JSON file"),
      option("--type", "Operation type: query | mutation"),
      option("--url", "GraphQL endpoint URL"),
      option("--variables", "JSON object of GraphQL variables"),
    ].join("\n"),
  ),
  "",
  `${bold("Examples")}`,
  example("Execute a saved request", "giraffe request --request collection/example.json"),
  "",
  example(
    "Execute a saved request with different variables",
    `giraffe request --request collection/example.json --variables '{"id":"123"}'`,
  ),
  "",
  example(
    "Execute a raw query directly against a server",
    `giraffe request --url http://localhost:4000/graphql --query 'query { viewer { id } }'`,
  ),
  "",
  example(
    "Execute a raw query with custom headers",
    `giraffe request --url http://localhost:4000/graphql --headers '{"Authorization":"Bearer <token>"}' --query 'query { viewer { id } }'`,
  ),
  "",
  example(
    "Generate and execute a query from the schema",
    "giraffe request --url http://localhost:4000/graphql --name viewer --type query",
  ),
  "",
  example(
    "Generate and execute a mutation using a saved request's url and headers",
    `giraffe request --request applause/localhost-mydot-kaden.json --name updateUser --type mutation --variables '{"input":{"id":"123"}}'`,
  ),
  "",
].join("\n")

export default async function request() {
  process.stdout.write(`\n${REQUEST_HELP}\n`)
}
