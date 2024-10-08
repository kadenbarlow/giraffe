import { useState } from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import safelyParseJson from "#lib/safely-parse-json.js"

export default function useController() {
  const name = useRequestStore((state) => state.name)
  const description = useRequestStore((state) => state.description)
  const filePath = useRequestStore((state) => state.filePath)
  const setRequest = useRequestStore((state) => state.setRequest)
  const [value, setValue] = useState(JSON.stringify({ description, filePath, name }, null, 2))

  const onChange = (value) => {
    setValue(value)
    const parsedValue = safelyParseJson(value)
    if (parsedValue) {
      const { description, filePath, name } = parsedValue
      setRequest({ description, filePath, name })
    }
  }

  return {
    onChange,
    value,
  }
}
