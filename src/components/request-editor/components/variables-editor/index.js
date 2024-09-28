import { Box } from "ink"
import React, { useState } from "react"
import TextInput from "#components/text-input/index.js"
import useTheme from "#hooks/use-theme.js"

export default function VariablesEditor({ focus, ...props }) {
  const [variables, setVariables] = useState("")
  const { syntax } = useTheme()

  return (
    <Box {...props}>
      <TextInput
        focus={focus}
        multiline={true}
        onChange={setVariables}
        syntax="json"
        syntaxTheme={syntax.json}
        value={variables}
      />
    </Box>
  )
}
