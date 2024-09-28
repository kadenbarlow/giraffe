import { Box, useApp, useInput } from "ink"
import React from "react"
import Header from "#components/header/index.js"
import QueryEditor from "#components/query-editor/index.js"
import RequestEditor from "#components/request-editor/index.js"
import Response from "#components/response/index.js"
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
        <Box flexDirection="column" width="50%">
          <Box height="50%">
            <QueryEditor />
          </Box>
          <Box height="50%">
            <RequestEditor />
          </Box>
        </Box>
        <Box flexDirection="column" width="50%">
          <Response />
        </Box>
      </Box>
    </Box>
  )
}
