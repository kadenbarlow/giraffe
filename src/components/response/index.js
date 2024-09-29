import { Box, Text, useFocus } from "ink"
import React from "react"
import Tabs from "#components/tabs/index.js"
import useTheme from "#hooks/use-theme.js"
import syntaxHighlight from "#lib/syntax-highlight.js"
import useRequestStore from "#stores/use-request-store.js"

export default function Response({ ...props }) {
  const { isFocused } = useFocus()
  const { colors, syntax } = useTheme()
  const response = useRequestStore((state) => state.response)

  return (
    <Box
      borderColor={isFocused ? colors.accent : "white"}
      borderStyle="single"
      flexDirection="column"
      height="100%"
      paddingX={1}
      width="100%"
      {...props}
    >
      <Tabs tabs={["Response", "Collections"]} value="Response" />
      <Box paddingTop={1}>
        <Text>{JSON.stringify(response)}</Text>
      </Box>
    </Box>
  )
}
