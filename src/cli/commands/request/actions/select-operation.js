export default function selectOperation(ctx) {
  const { args, operations } = ctx
  if (!args.name) return ctx

  const definition = operations.definitions.find(
    (operation) => operation.operation === args.type && operation.name?.value === `${args.name}_${args.type}`,
  )

  if (!definition) throw new Error(`Could not find ${args.type} named "${args.name}"`)

  return {
    ...ctx,
    query: definition.loc.source.body
      .slice(definition.loc.start, definition.loc.end)
      .replace(/query (.*?)_query/, "query $1")
      .replace(/mutation (.*)_mutation/, "mutation $1")
      .replace(/subscription (.*)_subscription/, "subscription $1"),
  }
}
