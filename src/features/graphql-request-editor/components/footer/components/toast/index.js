import { Box, Text } from "ink"
import React from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function Toast({ ...props }) {
  const toast = useRequestStore((state) => state.toast)

  return (
    <Box {...props}>
      <Text>{toast}</Text>
    </Box>
  )
}
