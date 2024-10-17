import { Box } from "ink"
import React from "react"
import NestedSelect from "#components/nested-select/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useController from "./hooks/use-controller/index.js"

export default function Schema({ focus, ...props }) {
  const { options, selectOption } = useController()
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)

  return (
    <Box paddingTop={1} {...props}>
      <NestedSelect disabled={jumpModeEnabled} focus={focus} onSelect={selectOption} options={options} />
    </Box>
  )
}
