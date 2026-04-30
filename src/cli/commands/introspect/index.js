import pipe from "#lib/pipe/index.js"
import loadCollectionFile from "../request/actions/load-collection-file.js"
import parseOperationsAndTypesFromSchema from "../request/actions/parse-operations-and-types-from-schema.js"
import resolveRequestInputs from "../request/actions/resolve-request-inputs.js"
import selectOperation from "../request/actions/select-operation.js"
import { buildOutput, fetchSchema, printOutput, validateArgs, validateResolvedInputs } from "./actions/index.js"

export default async function introspect(ctx) {
  return pipe.async(
    validateArgs,
    loadCollectionFile,
    resolveRequestInputs,
    validateResolvedInputs,
    fetchSchema,
    parseOperationsAndTypesFromSchema,
    selectOperation,
    buildOutput,
    printOutput,
  )({
    collectionFile: null,
    collectionPath: null,
    headers: "{}",
    operations: null,
    output: "",
    query: "",
    schema: null,
    types: null,
    url: "",
    variables: "{}",
    ...ctx,
  })
}
