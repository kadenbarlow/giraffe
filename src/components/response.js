import { Box } from "ink"
import React from "react"

export default function Response({ ...props }) {
  return <Box borderStyle="single" {...props} height="100%" width="50%"></Box>
}
