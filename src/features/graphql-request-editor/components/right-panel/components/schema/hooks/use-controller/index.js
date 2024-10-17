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

  const fetchSchema = useCallback(
    debounce(function _fetchSchema(url) {
      pipe.async(
        fetchSchemaFromUrl,
        parseOperationsAndTypesFromSchema,
        formatOptions,
        displayFinishedToast,
        ({ options }) => setOptions(options),
      )({
        builtClientSchema: null,
        operations: null,
        schema: {},
        types: null,
        url,
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
