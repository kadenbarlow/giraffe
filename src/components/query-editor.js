import { highlight } from "cli-highlight"
import { Box, useFocus } from "ink"
import React, { useState } from "react"
import TextInput from "#components/text-input.js"
import useTheme from "#hooks/use-theme.js"

export default function QueryEditor({ ...props }) {
  const { isFocused } = useFocus()
  const { colors } = useTheme()
  const test = `
mutation LoginInternalUser {
    loginInternalUser(email: "scotty@applausehq.com", password: "Test1234!") {
        accessToken
        refreshToken
    }
}
  `
  const highlightTest = highlight(test, { language: "GraphQL" })
  const [query, setQuery] = useState(highlightTest)

  return (
    <Box
      borderColor={isFocused ? colors.accent : "white"}
      borderStyle="single"
      height="100%"
      width="50%"
      {...props}
      paddingX={1}
    >
      <TextInput focus={isFocused} onChange={setQuery} value={query} />
    </Box>
  )
}
