import crypto from "crypto"
import fs from "fs/promises"
import { useEffect, useState } from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#stores/use-config/index.js"

export default function useController() {
  const { filePath } = useConfig((config) => config.history)
  const setRequest = useRequestStore((state) => state.setRequest)
  const setToast = useRequestStore((state) => state.setToast)

  const [options, setOptions] = useState({})

  useEffect(
    function initializeHistory() {
      fs.readFile(filePath, "utf8")
        .then((contents) => {
          const history = JSON.parse(contents)
          setOptions(
            history.requests.reduce((opts, request) => {
              const key = crypto.randomUUID()
              const topLevelOperationMatches = request.query.match(/(query|mutation|subscription)\s+(\w+)/)
              const firstOperationMatches = request.query.match(/([^(query|mutation|subscription)]\w+)\s*(\(|\{)/)
              const operation =
                topLevelOperationMatches?.length >= 2
                  ? topLevelOperationMatches[2]
                  : firstOperationMatches?.length >= 1
                    ? firstOperationMatches[1]
                    : ""

              const options = {
                day: "numeric",
                hour: "numeric",
                hour12: false,
                minute: "numeric",
                month: "numeric",
                second: "numeric",
                year: "numeric",
              }
              const datetime = new Date(request.datetime).toLocaleString("en-US", options).replace(", ", " - ")

              opts[key] = {
                ...request,
                key,
                label: `${datetime} ${request.status} ${request.statusText} ${operation}`,
              }
              return opts
            }, {}),
          )
        })
        .catch(() => {
          setOptions({})
        })
    },
    [filePath, setOptions, setToast],
  )

  function selectOption(request) {
    setRequest({
      filePath: "",
      headers: request.headers,
      info: JSON.stringify({ description: "", filePath: "new-request.json", name: "" }, null, 2),
      query: request.query,
      response: request.response,
      url: request.url,
      variables: request.variables,
    })

    const message =
      `${request.status} ${request.statusText} - ` +
      `${request.responseTime}ms - ` +
      `${request.responseBodySize} bytes | ${request.responseSize} bytes`
    setToast({
      message,
      type: "success",
    })
  }

  return {
    options,
    selectOption,
  }
}
