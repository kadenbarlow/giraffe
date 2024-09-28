import { Box, Text, useFocus } from "ink"
import React, { useState } from "react"
import Tabs from "#components/tabs/index.js"
import useTheme from "#hooks/use-theme.js"
import VariablesEditor from "./components/variables-editor/index.js"

const TABS = {
  VARIABLES: "Variables",
  HEADERS: "Headers", // eslint-disable-line
}

export default function RequestEditor({ ...props }) {
  const { isFocused } = useFocus()
  const { colors } = useTheme()
  const [activeTab, setActiveTab] = useState(TABS.VARIABLES)

  return (
    <Box
      borderColor={isFocused ? colors.accent : "white"}
      borderStyle="single"
      flexDirection="column"
      width="100%"
      {...props}
      paddingX={1}
    >
      <Tabs onChange={setActiveTab} tabs={Object.values(TABS)} value={activeTab} />
      {activeTab === TABS.VARIABLES && <VariablesEditor focus={isFocused} />}
    </Box>
  )
}
