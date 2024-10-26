import { Box, Text } from "ink"
import React from "react"
import ScrollArea from "#components/scroll-area/index.js"
import TextInput from "#components/text-input/index.js"
import pSBC from "#lib/pSBC.js"
import useConfig from "#stores/use-config/index.js"
import Option from "./components/option.js"
import useController from "./hooks/use-controller.js"

export default function NestedSelect(props) {
  const theme = useConfig((config) => config.theme)
  const { disabled, focus, onSelect, options, scrollHeight, search, selectedOption, setSearch } = useController(props)

  const renderOptions = ([key, value]) => {
    if (value.key) {
      if (search && !value.label.toLowerCase().includes(search.toLowerCase())) return null
      return <Option focus={selectedOption?.key === value.key} label={value.label} onSelect={onSelect} value={value} />
    } else {
      const options = Object.entries(value).map(renderOptions).filter(Boolean)
      if (options.length) {
        return (
          <Box flexDirection="column">
            <Text>{key}</Text>
            <Box flexDirection="column" paddingBottom={1} paddingX={2}>
              {options}
            </Box>
          </Box>
        )
      } else return <React.Fragment />
    }
  }

  return (
    <Box flexDirection="column" {...props}>
      <Box flexDirection="row" paddingBottom={1}>
        <Text>Search: </Text>
        <TextInput
          backgroundColor={focus && !selectedOption ? pSBC(0.01, theme.background) : null}
          disabled={disabled}
          focus={focus && !selectedOption}
          multiline={false}
          onChange={setSearch}
          value={search}
          width={50}
        />
      </Box>
      <ScrollArea disableScrollOnReturn={true} focus={Boolean(focus && selectedOption)} height={scrollHeight}>
        {Object.entries(options).map(renderOptions)}
      </ScrollArea>
    </Box>
  )
}
