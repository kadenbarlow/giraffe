import { Box, Text } from "ink"
import React from "react"
import ScrollArea from "#components/scroll-area/index.js"
import useController from "./hooks/use-controller/index.js"

export default function TextInput(props) {
  const { disabled, formattedValue, inkProps, isFocused, scrollHeight } = useController(props)

  // return <Text {...inkProps}>{formattedValue}</Text>
  return (
    <Box flexDirection="column">
      <ScrollArea disableScrollOnReturn={disabled} focus={isFocused} height={scrollHeight}>
        {formattedValue.split("\n").map((line, index) => (
          <Text key={index} {...inkProps}>
            {line}
          </Text>
        ))}
      </ScrollArea>
    </Box>
  )
}
