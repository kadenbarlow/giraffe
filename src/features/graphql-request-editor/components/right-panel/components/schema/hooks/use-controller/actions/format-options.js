import crypto from "crypto"

function parseVariableDefinitionType(definition, result = {}) {
  if (definition.ofType || definition.type) {
    return parseVariableDefinitionType(definition.ofType || definition.type, result)
  } else if (definition._fields) {
    return Object.entries(definition._fields).reduce((fieldProperties, [property, field]) => {
      fieldProperties[property] = parseVariableDefinitionType(field)
      return fieldProperties
    }, result)
  } else {
    return definition.name
  }
}

function parseVariableDefinitionTypeName(definition) {
  if (definition.type) return parseVariableDefinitionTypeName(definition.type)
  else return definition.name.value
}

export default function formatOptions(ctx) {
  const { operations, schema } = ctx

  return {
    ...ctx,
    options: operations.definitions.reduce(
      (options, definition) => {
        const option = {
          ...definition,
          key: crypto.randomUUID(),
          label: definition.name.value
            .replace(/_query$/, "")
            .replace(/_mutation$/, "")
            .replace(/_subscription$/, ""),
          variables: definition.variableDefinitions?.reduce((variables, definition) => {
            const property = definition.variable.name.value
            variables[property] = parseVariableDefinitionType(
              schema._typeMap[parseVariableDefinitionTypeName(definition)],
            )
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
