import { Box, useApp, useInput } from "ink"
import React from "react"
import Header from "#components/header.js"
import QueryEditor from "#components/query-editor.js"
import Response from "#components/response.js"
import useScreenSize from "#hooks/use-screen-size.js"

export default function App({ args }) {
  const app = useApp()
  const { height, width } = useScreenSize()

  useInput((input, key) => {
    // if (input === "q") {
    //   app.exit()
    // }
  })

  return (
    <Box flexDirection="column" height={height} paddingX={2} paddingY={1} width={width}>
      <Header />
      <Box flexDirection="row" height="100%">
        <QueryEditor />
        <Response />
      </Box>
    </Box>
  )
}
