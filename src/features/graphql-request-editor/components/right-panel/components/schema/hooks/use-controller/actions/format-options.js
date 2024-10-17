import crypto from "crypto"

function parseVariableDefinitionType(schema, definition, result = {}) {
  const type = definition.type ?? definition
  if (type.name && type.name.value && typeof type.name.value === "string") {
    const typeDefinition = schema._typeMap[type.name.value]
    if (typeDefinition?._fields) return parseVariableDefinitionType(schema, typeDefinition, {})
    return typeDefinition?.name
  } else if (type.ofType) {
    if (type.ofType) return parseVariableDefinitionType(schema, type.ofType, result)
    return type.ofType.name
  } else if (type._fields || (type.name && type.name._fields)) {
    return Object.entries(type._fields || (type.name && type.name._fields)).reduce(
      (fieldProperties, [property, field]) => {
        fieldProperties[property] = parseVariableDefinitionType(schema, field)
        return fieldProperties
      },
      result,
    )
  } else if (type.type) {
    return parseVariableDefinitionType(type, result)
  } else {
    return type.name || result
  }
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
          label: definition.name.value,
          variables: definition.variableDefinitions?.reduce((variables, definition) => {
            const property = definition.variable.name.value
            try {
              variables[property] = parseVariableDefinitionType(schema, definition.type)
            } catch (error) {
              debugger
              console.log(error)
            }
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
