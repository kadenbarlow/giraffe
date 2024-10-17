import { parse, print, printSchema } from "graphql"
import { buildOperationNodeForField } from "@graphql-tools/utils"

export default function parseSchema(ctx) {
  const { builtClientSchema: schema } = ctx

  const operationsDictionary = {
    mutation: { ...(schema.getMutationType()?.getFields() || {}) },
    query: { ...(schema.getQueryType()?.getFields() || {}) },
    subscription: { ...(schema.getSubscriptionType()?.getFields() || {}) },
  }

  let documentString = ""

  Object.keys(operationsDictionary).forEach((kind) => {
    Object.keys(operationsDictionary[kind]).forEach((field) => {
      const operationAST = buildOperationNodeForField({
        field,
        kind,
        schema,
      })

      documentString += print(operationAST)
    })
  })

  return { ...ctx, operations: parse(documentString), types: printSchema(schema) }
}
