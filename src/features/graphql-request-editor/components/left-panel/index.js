import { Box, useFocus } from "ink"
import React from "react"
import Tabs from "#components/tabs/index.js"
import TextInput from "#components/text-input/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"

export default function LeftPanel({ ...props }) {
  const { isFocused } = useFocus()
  const { theme } = useConfig()
  const query = useRequestStore((state) => state.query)
  const setQuery = useRequestStore((state) => state.setQuery)

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
      <Tabs tabs={["Request"]} value="Request" />
      <Box paddingTop={1}>
        <TextInput
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
