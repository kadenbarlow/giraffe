import { Box } from "ink"
import React from "react"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"
import useScreenSize from "#hooks/use-screen-size.js"

export default function VariablesEditor({ focus, ...props }) {
  const { theme } = useConfig()
  const variables = useRequestStore((state) => state.variables)
  const setVariables = useRequestStore((state) => state.setVariables)
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const { height } = useScreenSize()

  return (
    <Box paddingTop={1} {...props}>
      <TextInput
        disabled={jumpModeEnabled}
        focus={focus}
        multiline={true}
        onChange={setVariables}
        scrollHeight={Math.floor(height * 0.2) + 2}
        syntax="jsonc"
        syntaxTheme={theme}
        value={variables}
      />
    </Box>
  )
}
