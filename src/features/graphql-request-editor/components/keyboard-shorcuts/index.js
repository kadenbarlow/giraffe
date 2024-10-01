import { Box, Text } from "ink"
import React from "react"

export default function KeyboardShortcuts() {
  return (
    <Box flexDirection="row">
      <Text> ^n new </Text>
      <Text> ^o jump </Text>
      <Text> ^p format </Text>
      <Text> ^q quit </Text>
      <Text> ^r request </Text>
      <Text> ^s save </Text>
      <Text> ^y copy </Text>
    </Box>
  )
}
