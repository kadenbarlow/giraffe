import chalk from "chalk"
import { Box, Text, useFocus } from "ink"
import React from "react"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useScreenSize from "#hooks/use-screen-size.js"
import pSBC from "#lib/pSBC.js"
import useConfig from "#stores/use-config/index.js"

export default function Header(props) {
  const theme = useConfig((config) => config.theme)
  const { width } = useScreenSize()
  const { isFocused } = useFocus({ autoFocus: true, id: "header" })
  const url = useRequestStore((state) => state.url)
  const setUrl = useRequestStore((state) => state.setUrl)
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)

  return (
    <Box height={1} {...props} width="100%">
      <Box paddingLeft={1} width="100%">
        <Text color={theme.urlLabel}>
          {jumpModeEnabled ? chalk.inverse(chalk.hex(theme.tabKey)("U")) : "G"}raphql Endpoint:{" "}
        </Text>
        <TextInput
          backgroundColor={isFocused ? pSBC(0.01, theme.background) : null}
          color="white"
          disabled={jumpModeEnabled}
          focus={isFocused}
          onChange={setUrl}
          value={url}
          width={width / 2 - 21}
        />
      </Box>
      <Box flexDirection="row" width={16}>
        <Text bold={true} color={theme.accent}>
          Giraffe
        </Text>
        <Text color={theme.accent}> 0.1.9</Text>
      </Box>
    </Box>
  )
}
