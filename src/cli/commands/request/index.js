import pipe from "#lib/pipe/index.js"
import {
  fetchSchema,
  loadCollectionFile,
  parseOperationsAndTypesFromSchema,
  parseResponse,
  printResponse,
  resolveRequestInputs,
  selectOperation,
  sendGraphqlRequest,
  validateArgs,
} from "./actions/index.js"

export default async function request(ctx) {
  return pipe.async(
    validateArgs,
    loadCollectionFile,
    resolveRequestInputs,
    fetchSchema,
    parseOperationsAndTypesFromSchema,
    selectOperation,
    sendGraphqlRequest,
    parseResponse,
    printResponse,
  )({
    collectionFile: null,
    collectionPath: null,
    headers: "{}",
    operations: null,
    parsedResponse: null,
    query: "",
    response: null,
    schema: null,
    types: null,
    url: "",
    variables: "{}",
    ...ctx,
  })
}
