import { Box, Text, useFocus } from "ink"
import React, { useState } from "react"
import Tabs from "#components/tabs/index.js"
import useTheme from "#hooks/use-theme.js"
import syntaxHighlight from "#lib/syntax-highlight.js"

export default function Response({ ...props }) {
  const { isFocused } = useFocus()
  const { colors, syntax } = useTheme()
  const [response, setResponse] = useState("")

  return (
    <Box
      borderColor={isFocused ? colors.accent : "white"}
      borderStyle="single"
      height="100%"
      paddingX={1}
      width="100%"
      {...props}
    >
      <Tabs tabs={["Response", "Collections"]} value="Response" />
      <Text>{syntaxHighlight(response, { language: "json", theme: syntax.json })}</Text>
    </Box>
  )
}
