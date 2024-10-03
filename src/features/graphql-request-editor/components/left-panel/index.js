import { Box, useFocus } from "ink"
import React from "react"
import Tabs from "#components/tabs/index.js"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"
import useScreenSize from "#hooks/use-screen-size.js"
import pSBC from "#lib/pSBC.js"

const TABS = {
  REQUEST: {
    jumpKey: "E",
    value: "Request",
  },
}

export default function LeftPanel({ ...props }) {
  const { isFocused } = useFocus({ id: "left-panel" })
  const { theme } = useConfig()
  const query = useRequestStore((state) => state.query)
  const setQuery = useRequestStore((state) => state.setQuery)
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const { height } = useScreenSize()

  return (
    <Box
      borderColor={isFocused ? theme.boxBorder : pSBC(-0.7, theme.boxBorder)}
      borderStyle={isFocused ? "bold" : "round"}
      flexDirection="column"
      height="100%"
      paddingX={1}
      width="100%"
      {...props}
    >
      <Tabs jumpModeEnabled={jumpModeEnabled} tabs={Object.values(TABS)} value={TABS.REQUEST} />
      <Box paddingTop={1}>
        <TextInput
          disabled={jumpModeEnabled}
          focus={isFocused}
          multiline={true}
          onChange={setQuery}
          scrollHeight={Math.floor(height * 0.6) - 6}
          syntax="gql"
          syntaxTheme={theme}
          value={query}
        />
      </Box>
    </Box>
  )
}
