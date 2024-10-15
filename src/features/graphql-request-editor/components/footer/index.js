import { Box } from "ink"
import React from "react"
import KeyboardShortcuts from "./components/keyboard-shorcuts/index.js"
import Toast from "./components/toast/index.js"

export default function Footer({ ...props }) {
  return (
    <Box flexDirection="row" justifyContent="space-between" {...props}>
      <KeyboardShortcuts />
      <Toast />
    </Box>
  )
}
