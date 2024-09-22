import { Box, Text } from "ink"
import TextInput from "ink-text-input"
import React, { useState } from "react"
import useTheme from "#hooks/use-theme.js"

export default function Header(props) {
  const [query, setQuery] = useState("")
  const { colors } = useTheme()

  return (
    <Box height={3} {...props}>
      <Box flexDirection="row" marginTop={1} width={16}>
        <Text bold={true} color={colors.accent}>
          Giraffe
        </Text>
        <Text color={colors.accent}> 1.2.1</Text>
      </Box>
      {/* <Box borderStyle="round" height={3} width="100%"> */}
      {/*   <TextInput onChange={setQuery} value={query} /> */}
      {/* </Box> */}
      <Box height={1} width="100%">
        <TextInput onChange={setQuery} placeholder="Enter url here..." value={query} />
      </Box>
    </Box>
  )
}
