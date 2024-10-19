import fs from "fs/promises"
import { useInput } from "ink"
import { useEffect, useRef, useState } from "react"
import pipe from "#lib/pipe/index.js"
import useConfig from "#stores/use-config/index.js"
import { getCollectionFiles, loadCollectionFiles, serializeInputFiles } from "./actions/index.js"

export default function useCollections() {
  const [collections, setCollections] = useState({})
  const [modifiedAt, setModifiedAt] = useState(Date.now())
  const abortController = useRef(new AbortController())

  const folderPath = useConfig.getState().collections.folderPath

  useEffect(
    function initializeCollections() {
      pipe.async(getCollectionFiles, loadCollectionFiles, serializeInputFiles, ({ collections }) =>
        setCollections(collections),
      )({
        collections: {},
        collectionsFolder: folderPath,
        filePaths: [],
        parsedFilesByPath: {},
      })
    },
    [folderPath, modifiedAt],
  )

  useEffect(function initializeWatcher() {
    ;(async () => {
      try {
        const watcher = fs.watch(folderPath, { signal: abortController.current.signal })
        for await (const event of watcher) setModifiedAt(Date.now()) // eslint-disable-line
      } catch (err) {
        if (err.name === "AbortError") return
        throw err
      }
    })()

    const controller = abortController.current
    return () => {
      controller.abort()
    }
  })

  useInput((input, key) => {
    const meta = key.ctrl || key.meta
    if (meta && ["c", "d", "q"].includes(input)) {
      abortController.current.abort()
    }
  })

  return {
    collections,
  }
}
