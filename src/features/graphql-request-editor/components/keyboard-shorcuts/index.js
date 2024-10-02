import { Box, Text } from "ink"
import React from "react"
import useConfig from "#hooks/use-config.js"

export default function KeyboardShortcuts() {
  const { theme } = useConfig()

  return (
    <Box flexDirection="row">
      <Text color={theme.keyboardShortcut}> ^n </Text>
      <Text color={theme.keyboardShortcutText}>New </Text>

      <Text color={theme.keyboardShortcut}> ^o </Text>
      <Text color={theme.keyboardShortcutText}>Jump </Text>

      <Text color={theme.keyboardShortcut}> ^p </Text>
      <Text color={theme.keyboardShortcutText}>Format </Text>

      <Text color={theme.keyboardShortcut}> ^q </Text>
      <Text color={theme.keyboardShortcutText}>Quit </Text>

      <Text color={theme.keyboardShortcut}> ^r </Text>
      <Text color={theme.keyboardShortcutText}>Request </Text>

      <Text color={theme.keyboardShortcut}> ^s </Text>
      <Text color={theme.keyboardShortcutText}>Save </Text>

      <Text color={theme.keyboardShortcut}> ^y </Text>
      <Text color={theme.keyboardShortcutText}>Copy </Text>

      <Text color={theme.keyboardShortcut}> ^b </Text>
      <Text color={theme.keyboardShortcutText}>Open in Editor </Text>
    </Box>
  )
}
