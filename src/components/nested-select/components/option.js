import chalk from "chalk"
import { Box, Text, useFocus, useInput } from "ink"
import React from "react"

export default function Option({ label, onSelect, value, ...props }) {
  const { isFocused } = useFocus()

  useInput(
    (_input, key) => {
      if (key.return) {
        onSelect(value)
      }
    },
    { isActive: isFocused },
  )

  return (
    <Box {...props}>
      <Text>{isFocused ? chalk.inverse(label) : label}</Text>
    </Box>
  )
}
