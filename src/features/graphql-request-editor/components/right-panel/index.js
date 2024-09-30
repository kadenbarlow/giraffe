import { Box, Text, useFocus } from "ink"
import React from "react"
import Tabs from "#components/tabs/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"

export default function RightPanel({ ...props }) {
  const { isFocused } = useFocus()
  const { theme } = useConfig()
  const response = useRequestStore((state) => state.response)

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
      <Tabs tabs={["Response", "Schema", "Collections"]} value="Response" />
      <Box paddingTop={1}>
        <Text>{JSON.stringify(response)}</Text>
      </Box>
    </Box>
  )
}
