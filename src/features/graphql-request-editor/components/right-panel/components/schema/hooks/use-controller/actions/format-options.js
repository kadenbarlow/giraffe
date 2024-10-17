import crypto from "crypto"

export default function formatOptions(ctx) {
  const { operations, schema } = ctx

  return {
    ...ctx,
    options: operations.definitions.reduce(
      (options, definition) => {
        const option = {
          ...definition,
          key: crypto.randomUUID(),
          label: definition.name.value,
          variables: definition.variableDefinitions?.reduce((variables, definition) => {
            variables[definition.variable.name.value] = Object.entries(
              schema._typeMap[(definition.type.type || definition.type).name.value]._fields,
            ).reduce((fields, [name, field]) => {
              fields[name] = field.type.name || field.type.ofType.name
              return fields
            }, {})
            return variables
          }, {}),
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
