import { Box, useApp, useInput } from "ink"
import React from "react"
import Header from "#components/header.js"
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
    <Box height={height} paddingX={2} paddingY={1} width={width}>
      <Header />
    </Box>
  )
}
