import clipboard from "clipboardy"
import { Box } from "ink"
import React from "react"
import NestedSelect from "#components/nested-select/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useScreenSize from "#hooks/use-screen-size.js"
import useController from "./hooks/use-controller/index.js"

export default function Code({ focus, ...props }) {
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const { options } = useController()
  const { height } = useScreenSize()
  const { setToast } = useRequestStore.getState()

  return (
    <Box paddingTop={1} {...props}>
      <NestedSelect
        disabled={jumpModeEnabled}
        focus={focus}
        onSelect={async (option) => {
          const generatedContent = await option.function(useRequestStore.getState())
          clipboard.write(generatedContent)
          setToast({ message: "Copied to clipboard", timeout: 3000, type: "success" })
        }}
        options={options}
        optionsHeight={Math.floor(height - 10)}
      />
    </Box>
  )
}
