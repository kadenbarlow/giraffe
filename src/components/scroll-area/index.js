import { Box, measureElement, useInput } from "ink"
import React, { useEffect, useRef, useState } from "react"

const NEWLINE_CHARACTERS = ["\n", "\r", "\r\n"]

export default function ScrollArea({ children, focus, height, ...props }) {
  const [scrollTop, setScrollTop] = useState(0)
  const [innerHeight, setInnerHeight] = useState(height)
  const innerRef = useRef()

  useEffect(
    function initialize() {
      const dimensions = measureElement(innerRef.current)
      setInnerHeight(dimensions.height)
    },
    [children, setInnerHeight],
  )

  useInput(
    (input, key) => {
      if (innerHeight < height) return
      if (key.downArrow || (NEWLINE_CHARACTERS.includes(input) && innerHeight > height)) {
        setScrollTop((prev) => Math.min(innerHeight - height, prev + 1))
      }

      if (key.upArrow) {
        setScrollTop((prev) => Math.max(0, prev - 1))
      }
    },
    { isActive: focus },
  )

  return (
    <Box flexDirection="column" height={height} overflow="hidden" {...props}>
      <Box flexDirection="column" flexShrink={0} marginTop={-scrollTop} ref={innerRef}>
        {children}
      </Box>
    </Box>
  )
}
