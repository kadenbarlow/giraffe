import { useEffect, useState } from "react"
import pipe from "#lib/pipe/index.js"
import useConfig from "#stores/use-config/index.js"
import { getCollectionFiles, loadCollectionFiles, serializeInputFiles } from "./actions/index.js"

export default function useCollections() {
  const [collections, setCollections] = useState({})

  useEffect(function initialize() {
    pipe.async(getCollectionFiles, loadCollectionFiles, serializeInputFiles, ({ collections }) =>
      setCollections(collections),
    )({
      collections: {},
      collectionsFolder: useConfig.getState().collections.folderPath,
      filePaths: [],
      parsedFilesByPath: {},
    })
  }, [])

  return {
    collections,
  }
}
