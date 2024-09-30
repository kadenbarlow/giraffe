import { Box } from "ink"
import React from "react"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"

export default function VariablesEditor({ focus, ...props }) {
  const { theme } = useConfig()
  const variables = useRequestStore((state) => state.variables)
  const setVariables = useRequestStore((state) => state.setVariables)

  return (
    <Box paddingTop={1} {...props}>
      <TextInput
        focus={focus}
        multiline={true}
        onChange={setVariables}
        syntax="jsonc"
        syntaxTheme={theme}
        value={variables}
      />
    </Box>
  )
}
