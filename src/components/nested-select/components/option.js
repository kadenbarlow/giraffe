import chalk from "chalk"
import { Box, Text, useInput } from "ink"
import React from "react"

export default function Option({ focus, label, onSelect, value, ...props }) {
  useInput(
    (_input, key) => {
      if (key.return) {
        onSelect(value)
      }
    },
    { isActive: focus },
  )

  return (
    <Box {...props}>
      <Text>{focus ? chalk.inverse(label) : label}</Text>
    </Box>
  )
}
