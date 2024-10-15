import { Box } from "ink"
import React from "react"
import BottomPanel from "./components/bottom-panel/index.js"
import Footer from "./components/footer/index.js"
import Header from "./components/header/index.js"
import LeftPanel from "./components/left-panel/index.js"
import RightPanel from "./components/right-panel/index.js"
import useInput from "./hooks/use-input/index.js"

export default function GraphqlRequestEditor() {
  useInput()

  return (
    <Box flexDirection="column" height="100%" width="100%">
      <Header />
      <Box flexDirection="row" height="100%">
        <Box flexDirection="column" width="50%">
          <Box height="60%">
            <LeftPanel />
          </Box>
          <Box height="40%">
            <BottomPanel />
          </Box>
        </Box>
        <Box flexDirection="column" width="50%">
          <RightPanel />
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
