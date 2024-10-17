import { Box } from "ink"
import React from "react"
import NestedSelect from "#components/nested-select/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useScreenSize from "#hooks/use-screen-size.js"
import useCollections from "./hooks/use-collections/index.js"

export default function Collections({ focus, ...props }) {
  const { collections } = useCollections()
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const setRequest = useRequestStore((state) => state.setRequest)
  const { height } = useScreenSize()

  return (
    <Box paddingTop={1} {...props}>
      <NestedSelect
        disabled={jumpModeEnabled}
        focus={focus}
        onSelect={(request) =>
          setRequest({
            filePath: request.filePath,
            headers: JSON.stringify(request.headers, null, 2),
            info: JSON.stringify(
              { description: request.description, filePath: request.filePath, name: request.name },
              null,
              2,
            ),
            query: request.query,
            url: request.url,
            variables: JSON.stringify(request.variables, null, 2),
          })
        }
        options={collections}
        optionsHeight={Math.floor(height - 10)}
      />
    </Box>
  )
}
