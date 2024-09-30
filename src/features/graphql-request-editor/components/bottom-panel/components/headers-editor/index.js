import { Box } from "ink"
import React from "react"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"

export default function HeadersEditor({ focus, ...props }) {
  const { theme } = useConfig()
  const headers = useRequestStore((state) => state.headers)
  const setHeaders = useRequestStore((state) => state.setHeaders)
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)

  return (
    <Box paddingTop={1} {...props}>
      <TextInput
        disabled={jumpModeEnabled}
        focus={focus}
        multiline={true}
        onChange={setHeaders}
        syntax="jsonc"
        syntaxTheme={theme}
        value={headers}
      />
    </Box>
  )
}
