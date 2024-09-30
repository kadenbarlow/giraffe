import { Box, useInput } from "ink"
import React from "react"
import GraphqlRequestEditor from "#features/graphql-request-editor/index.js"
import useScreenSize from "#hooks/use-screen-size.js"

// export default function App({ args }) { // see args passed from cli module
export default function App() {
  const { height, width } = useScreenSize()
  useInput((input, key) => {}) // Keep app open until intentional close

  return (
    <Box flexDirection="column" height={height} paddingX={2} paddingY={1} width={width}>
      <GraphqlRequestEditor />
    </Box>
  )
}
