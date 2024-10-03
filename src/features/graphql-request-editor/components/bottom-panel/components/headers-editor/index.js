import { Box } from "ink"
import React from "react"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useScreenSize from "#hooks/use-screen-size.js"
import useConfig from "#stores/use-config/index.js"

export default function HeadersEditor({ focus, ...props }) {
  const theme = useConfig((config) => config.theme)
  const headers = useRequestStore((state) => state.headers)
  const setHeaders = useRequestStore((state) => state.setHeaders)
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const { height } = useScreenSize()

  return (
    <Box paddingTop={1} {...props}>
      <TextInput
        disabled={jumpModeEnabled}
        focus={focus}
        multiline={true}
        onChange={setHeaders}
        scrollHeight={Math.floor(height * 0.4) - 6}
        syntax="jsonc"
        syntaxTheme={theme}
        value={headers}
      />
    </Box>
  )
}
