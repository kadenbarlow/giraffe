import { useEffect, useState } from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import pipe from "#lib/pipe/index.js"
import useConfig from "#stores/use-config/index.js"
import { getCollectionFiles, loadCollectionFiles, serializeInputFiles } from "./actions/index.js"

export default function useController() {
  const [collections, setCollections] = useState({})
  const folderPath = useConfig.getState().collections.folderPath
  const savedAt = useRequestStore((state) => state.savedAt)
  const setRequest = useRequestStore((state) => state.setRequest)
  const setToast = useRequestStore.getState().setToast

  useEffect(() => {
    pipe
      .async(getCollectionFiles, loadCollectionFiles, serializeInputFiles, ({ collections }) =>
        setCollections(collections),
      )({
        collections: {},
        collectionsFolder: folderPath,
        filePaths: [],
        parsedFilesByPath: {},
      })
      .catch((error) => {
        setToast({ message: error.message, type: "error" })
      })
  }, [folderPath, setToast, savedAt])

  const removeTabs = (string) => string.replace(/\t/g, "  ")
  const selectRequest = (request) => {
    setRequest({
      filePath: request.filePath,
      headers: removeTabs(JSON.stringify(request.headers, null, 2)),
      info: removeTabs(
        JSON.stringify({ description: request.description, filePath: request.filePath, name: request.name }, null, 2),
      ),
      query: removeTabs(request.query),
      url: removeTabs(request.url),
      variables: removeTabs(JSON.stringify(request.variables, null, 2)),
    })
  }

  return {
    collections,
    selectRequest,
  }
}
