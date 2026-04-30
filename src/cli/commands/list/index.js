import getCollectionFiles from "#features/graphql-request-editor/components/right-panel/components/collections/hooks/use-controller/actions/get-collection-files.js"
import pipe from "#lib/pipe/index.js"
import { buildOutput, loadCollectionFiles, printOutput, resolveCollectionsFolder } from "./actions/index.js"

export default async function list(ctx) {
  return pipe.async(
    resolveCollectionsFolder,
    getCollectionFiles,
    loadCollectionFiles,
    buildOutput,
    printOutput,
  )({
    collectionsFolder: "",
    filePaths: [],
    output: "",
    parsedFilesByPath: {},
    ...ctx,
  })
}
