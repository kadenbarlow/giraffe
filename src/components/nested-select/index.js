import { Box, Text } from "ink"
import React, { useState } from "react"
import ScrollArea from "#components/scroll-area/index.js"
import TextInput from "#components/text-input/index.js"
import pSBC from "#lib/pSBC.js"
import useConfig from "#stores/use-config/index.js"
import Option from "./components/option.js"

export default function NestedSelect({ disabled, focus, onSelect, options, ...props }) {
  const theme = useConfig((config) => config.theme)
  const [search, setSearch] = useState("")

  const renderSelection = ([key, value]) => {
    if (value.name) {
      return <Option label={value.label} onSelect={onSelect} value={value} />
    } else {
      return (
        <Box flexDirection="column">
          <Text>{key}</Text>
          <Box flexDirection="column" paddingBottom={1} paddingX={2}>
            {Object.entries(value).map(renderSelection)}
          </Box>
        </Box>
      )
    }
  }

  return (
    <Box flexDirection="column" {...props}>
      <Box flexDirection="row" paddingBottom={1}>
        <Text>Search: </Text>
        <TextInput
          backgroundColor={focus ? pSBC(0.01, theme.background) : null}
          disabled={disabled}
          focus={focus}
          multiline={false}
          onChange={setSearch}
          value={search}
          width={50}
        />
      </Box>
      <ScrollArea>{Object.entries(options).map(renderSelection)}</ScrollArea>
    </Box>
  )
}
