import { Box } from "ink"
import React from "react"
import NestedSelect from "#components/nested-select/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useScreenSize from "#hooks/use-screen-size.js"
import useController from "./hooks/use-controller/index.js"

export default function Collections({ focus, ...props }) {
  const { options } = useController()
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const setRequest = useRequestStore((state) => state.setRequest)
  const { height } = useScreenSize()

  return (
    <Box paddingTop={1} {...props}>
      <NestedSelect
        disabled={jumpModeEnabled}
        focus={focus}
        onSelect={(request) => {
          setRequest({
            filePath: "",
            headers: request.headers,
            info: JSON.stringify({ description: "", filePath: "new-request.json", name: "" }, null, 2),
            query: request.query,
            response: request.response,
            url: request.url,
            variables: request.variables,
          })
        }}
        options={options}
        optionsHeight={Math.floor(height - 10)}
      />
    </Box>
  )
}
