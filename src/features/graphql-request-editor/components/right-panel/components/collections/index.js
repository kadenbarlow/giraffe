import { Box, Text } from "ink"
import React from "react"
import useCollections from "./hooks/use-collections/index.js"

export default function Collections() {
  const { collections } = useCollections()

  return (
    <Box paddingTop={1}>
      <Text>{JSON.stringify(collections, null, 2)}</Text>
    </Box>
  )
}
