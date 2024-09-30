import { Box, Text } from "ink"
import React from "react"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function Response() {
  const response = useRequestStore((state) => state.response)

  return (
    <Box paddingTop={1}>
      <Text>{response}</Text>
    </Box>
  )
}
