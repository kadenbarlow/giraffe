import formatOptions from "#features/graphql-request-editor/components/right-panel/components/schema/hooks/use-controller/actions/format-options.js"

function formatOperationName(definition) {
  return definition.name.value
    .replace(/_query$/, "")
    .replace(/_mutation$/, "")
    .replace(/_subscription$/, "")
}

function formatOperationList(definitions, type) {
  const lines = definitions
    .filter((definition) => definition.operation === type)
    .map((definition) => `- ${formatOperationName(definition)}`)

  if (!lines.length) return []

  return [`${type === "query" ? "Queries" : "Mutations"}:`, ...lines]
}

export default function buildOutput(ctx) {
  const { args, operations, query } = ctx

  if (args.name) {
    const { options } = formatOptions(ctx)
    const option = options[`${args.type}s`][`${args.name}_${args.type}`]

    if (!option) throw new Error(`Could not find ${args.type} named "${args.name}"`)

    return {
      ...ctx,
      output: [
        `Type: ${args.type}`,
        `Name: ${args.name}`,
        "",
        "Query:",
        query,
        "",
        "Variables:",
        JSON.stringify(option.variables || {}, null, 2),
        "",
      ].join("\n"),
    }
  }

  const sections = []

  if (!args.type || args.type === "query") {
    sections.push(...formatOperationList(operations.definitions, "query"))
  }

  if (!args.type || args.type === "mutation") {
    if (sections.length) sections.push("")
    sections.push(...formatOperationList(operations.definitions, "mutation"))
  }

  if (!sections.length) {
    sections.push(args.type ? `No ${args.type} operations found` : "No query or mutation operations found")
  }

  return {
    ...ctx,
    output: `${sections.join("\n")}\n`,
  }
}
