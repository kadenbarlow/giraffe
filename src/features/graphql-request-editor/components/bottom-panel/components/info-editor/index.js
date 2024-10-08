import { Box } from "ink"
import React from "react"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useScreenSize from "#hooks/use-screen-size.js"
import useConfig from "#stores/use-config/index.js"
import useController from "./hooks/use-controller.js"

export default function InfoEditor({ focus, ...props }) {
  const theme = useConfig((config) => config.theme)
  const { height } = useScreenSize()
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const { onChange, value } = useController()

  return (
    <Box paddingTop={1} {...props}>
      <TextInput
        disabled={jumpModeEnabled}
        focus={focus}
        multiline={true}
        onChange={onChange}
        scrollHeight={Math.floor(height * 0.4) - 6}
        syntax="jsonc"
        syntaxTheme={theme}
        value={value}
      />
    </Box>
  )
}
