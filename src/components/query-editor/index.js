import { Box, useFocus } from "ink"
import React, { useState } from "react"
import TextInput from "#components/text-input/index.js"
import useTheme from "#hooks/use-theme.js"

export default function QueryEditor({ ...props }) {
  const { isFocused } = useFocus()
  const { colors, syntax } = useTheme()
  const [query, setQuery] = useState("")

  return (
    <Box
      borderColor={isFocused ? colors.accent : "white"}
      borderStyle="single"
      height="100%"
      paddingX={1}
      width="50%"
      {...props}
    >
      <TextInput
        focus={isFocused}
        multiline={true}
        onChange={setQuery}
        syntax="gql"
        syntaxTheme={syntax.graphql}
        value={query}
      />
    </Box>
  )
}
