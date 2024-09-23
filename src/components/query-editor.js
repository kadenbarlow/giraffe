import { Box, useFocus } from "ink"
import React, { useState } from "react"
import TextInput from "#components/text-input.js"
import useTheme from "#hooks/use-theme.js"

export default function QueryEditor({ ...props }) {
  const { isFocused } = useFocus()
  const { colors } = useTheme()
  const [query, setQuery] = useState("mutation {}")

  return (
    <Box
      borderColor={isFocused ? colors.accent : "white"}
      borderStyle="single"
      height="100%"
      width="50%"
      {...props}
      paddingX={1}
    >
      <TextInput focus={isFocused} onChange={setQuery} syntax="gql" value={query} />
    </Box>
  )
}
