import crypto from "crypto"

export default function formatOptions(ctx) {
  const { operations, types } = ctx

  return {
    ...ctx,
    options: operations.definitions.reduce(
      (options, definition) => {
        const option = {
          ...definition,
          key: crypto.randomUUID(),
          label: definition.name.value,
        }

        if (definition.operation === "query") {
          options.queries[definition.name.value] = option
        } else if (definition.operation === "mutation") {
          options.mutations[definition.name.value] = option
        }
        return options
      },
      { mutations: {}, queries: {} },
    ),
  }
}
