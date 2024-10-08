import { Box } from "ink"
import React from "react"
import NestedSelect from "#components/nested-select/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useCollections from "./hooks/use-collections/index.js"

export default function Collections({ focus, ...props }) {
  const { collections } = useCollections()
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const setRequest = useRequestStore((state) => state.setRequest)

  return (
    <Box paddingTop={1} {...props}>
      <NestedSelect
        disabled={jumpModeEnabled}
        focus={focus}
        onSelect={(request) =>
          setRequest({
            description: request.description,
            filePath: request.filePath,
            headers: JSON.stringify(request.headers, null, 2),
            name: request.name,
            query: request.query,
            url: request.url,
            variables: JSON.stringify(request.variables, null, 2),
          })
        }
        options={collections}
      />
    </Box>
  )
}
