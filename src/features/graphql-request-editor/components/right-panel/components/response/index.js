import { Box } from "ink"
import React from "react"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"
import useScreenSize from "#hooks/use-screen-size.js"

export default function Response({ focus, ...props }) {
  const response = useRequestStore((state) => state.response)
  const { theme } = useConfig()
  const { height } = useScreenSize()

  return (
    <Box paddingTop={1} {...props}>
      <TextInput
        disabled={true}
        focus={focus}
        multiline={true}
        onChange={() => null}
        scrollHeight={Math.floor(height * 0.8)}
        syntax="jsonc"
        syntaxTheme={theme}
        value={response}
      />
    </Box>
  )
}
