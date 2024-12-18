import { useCallback, useEffect, useState } from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import debounce from "#lib/debounce.js"
import pipe from "#lib/pipe/index.js"
import {
  displayFinishedToast,
  displayLoadingToast,
  fetchSchemaFromUrl,
  formatOptions,
  parseOperationsAndTypesFromSchema,
  selectOption,
} from "./actions/index.js"

export default function useSchema() {
  const [options, setOptions] = useState({})
  const url = useRequestStore((state) => state.url)
  const setToast = useRequestStore.getState().setToast

  const fetchSchema = useCallback(
    debounce(function _fetchSchema(url) {
      pipe
        .async(
          fetchSchemaFromUrl,
          parseOperationsAndTypesFromSchema,
          formatOptions,
          displayFinishedToast,
          ({ options }) => setOptions(options),
        )({
          operations: null,
          schema: null,
          types: null,
          url,
        })
        .catch((error) => {
          setToast({ message: error.message, type: "error" })
        })
    }, 200),
    [setOptions],
  )

  useEffect(() => {
    if (url) {
      displayLoadingToast()
      fetchSchema(url)
    }
  }, [fetchSchema, url])

  return {
    options,
    selectOption,
  }
}
