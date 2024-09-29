import { Box, Text } from "ink"
import React from "react"

export default function KeyboardShortcuts() {
  return (
    <Box flexDirection="row">
      <Text> ^j send </Text>
      <Text> ^n new </Text>
      <Text> ^o jump </Text>
      <Text> ^q quit </Text>
      <Text> ^s save </Text>
    </Box>
  )
}
