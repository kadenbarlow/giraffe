import { Box, useFocus } from "ink"
import React from "react"
import Tabs from "#components/tabs/index.js"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"

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

  return (
    <Box
      borderColor={isFocused ? theme.accent : "white"}
      borderStyle="single"
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
          syntax="gql"
          syntaxTheme={theme}
          value={query}
        />
      </Box>
    </Box>
  )
}
