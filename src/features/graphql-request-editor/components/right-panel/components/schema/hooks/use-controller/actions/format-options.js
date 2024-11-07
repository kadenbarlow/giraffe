import crypto from "crypto"

function find(definition, key) {
  if (definition[key]) return definition[key]
  if (definition.type) return find(definition.type, key)
  if (definition.ofType) return find(definition.ofType, key)
  return null
}

function parseVariableDefinitionType(definition, result = {}) {
  if (definition.ofType) {
    return parseVariableDefinitionType(definition.ofType, result)
  } else if (definition._fields) {
    return Object.entries(definition._fields).reduce((fieldProperties, [property, field]) => {
      fieldProperties[property] = parseVariableDefinitionType(field)
      return fieldProperties
    }, result)
  } else if (definition.type?.toString() && find(definition, "_fields")) {
    // Add typename to indicate whether a property is an an object or array, or optional or required
    return {
      __typename: definition.type.toString(),
      ...parseVariableDefinitionType(definition.type, result),
    }
  } else {
    // Handle GraphQL enums
    const values = find(definition, "_values")
    if (values) {
      const enumString = values.map((graphqlEnum) => graphqlEnum.value).join("|")
      return definition.type?.toString().startsWith("[") ? [enumString] : enumString
    }

    return definition.type?.toString() || definition.name
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
