import { Box, useFocus } from "ink"
import React, { useState } from "react"
import Tabs from "#components/tabs/index.js"
import useConfig from "#hooks/use-config.js"
import VariablesEditor from "./components/variables-editor/index.js"

const TABS = {
  VARIABLES: "Variables",
  HEADERS: "Headers", // eslint-disable-line perfectionist/sort-objects
}

export default function BottomPanel({ ...props }) {
  const { isFocused } = useFocus()
  const { theme } = useConfig()
  const [activeTab, setActiveTab] = useState(TABS.VARIABLES)

  return (
    <Box
      borderColor={isFocused ? theme.accent : "white"}
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
