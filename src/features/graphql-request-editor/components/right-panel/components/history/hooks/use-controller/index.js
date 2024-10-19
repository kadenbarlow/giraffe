import crypto from "crypto"
import fs from "fs/promises"
import { useEffect, useState } from "react"
import useConfig from "#stores/use-config/index.js"

export default function useController() {
  const { filePath } = useConfig((config) => config.history)
  const [options, setOptions] = useState({})

  useEffect(
    function initializeCollections() {
      fs.readFile(filePath, "utf8")
        .then((contents) => {
          const history = JSON.parse(contents)
          setOptions(
            history.requests.reduce((opts, request) => {
              const key = crypto.randomUUID()
              const operation = request.query.match(/(query|mutation|subscription)\s+(\w+)/)[2]

              opts[key] = {
                ...request,
                key,
                label: `${request.status} ${request.statusText} ${operation + " "}- ${request.datetime} - ${request.responseTime}ms`,
              }
              return opts
            }, {}),
          )
        })
        .catch(() => setOptions({}))
    },
    [filePath],
  )

  return {
    options,
  }
}
