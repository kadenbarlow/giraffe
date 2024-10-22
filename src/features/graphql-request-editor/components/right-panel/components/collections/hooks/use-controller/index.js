import { useEffect, useState } from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import pipe from "#lib/pipe/index.js"
import useConfig from "#stores/use-config/index.js"
import { getCollectionFiles, loadCollectionFiles, serializeInputFiles } from "./actions/index.js"

export default function useController() {
  const [collections, setCollections] = useState({})
  const folderPath = useConfig.getState().collections.folderPath
  const savedAt = useRequestStore((state) => state.savedAt)
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

  return {
    collections,
  }
}
