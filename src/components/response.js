import { Box, Text, useFocus } from "ink"
import React, { useState } from "react"
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
      width="50%"
      {...props}
    >
      <Text>{syntaxHighlight(response, { language: "json", theme: syntax.json })}</Text>
    </Box>
  )
}
