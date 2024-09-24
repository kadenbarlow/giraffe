import { Box, Text, useFocus } from "ink"
import React, { useState } from "react"
import TextInput from "#components/text-input/index.js"
import useScreenSize from "#hooks/use-screen-size.js"
import useTheme from "#hooks/use-theme.js"
import pSBC from "#lib/pSBC.js"

export default function Header(props) {
  const [query, setQuery] = useState("")
  const { colors } = useTheme()
  const { width } = useScreenSize()
  const { isFocused } = useFocus()

  return (
    <Box height={1} {...props} width="100%">
      <Box flexDirection="row" width={16}>
        <Text bold={true} color={colors.accent}>
          Giraffe
        </Text>
        <Text color={colors.accent}> 1.2.1</Text>
      </Box>
      <Box width="100%">
        <TextInput
          backgroundColor={pSBC(0.03, colors.background)}
          color="white"
          focus={isFocused}
          onChange={setQuery}
          placeholder="Enter a URL..."
          placeholderColor={pSBC(0.4, colors.background)}
          value={query}
          width={width / 2 - 18}
        />
      </Box>
    </Box>
  )
}
