import { Box, useFocus } from "ink"
import React, { useEffect, useState } from "react"
import Tabs from "#components/tabs/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"
import HeadersEditor from "./components/headers-editor/index.js"
import VariablesEditor from "./components/variables-editor/index.js"

const TABS = {
  HEADERS: {
    jumpKey: "H",
    value: "Headers",
  },
  VARIABLES: {
    jumpKey: "V",
    value: "Variables",
  },
}

export default function BottomPanel({ ...props }) {
  const { isFocused } = useFocus({ id: "bottom-panel" })
  const { theme } = useConfig()
  const [activeTab, setActiveTab] = useState(TABS.VARIABLES)
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const jumpKey = useRequestStore((state) => state.jumpKey)
  const setJumpKey = useRequestStore((state) => state.setJumpKey)

  useEffect(
    function selectTabOnJump() {
      function setTab(tab) {
        setActiveTab(tab)
        setJumpKey(null)
      }

      if (jumpKey === "v") setTab(TABS.VARIABLES)
      if (jumpKey === "h") setTab(TABS.HEADERS)
    },
    [jumpKey, setJumpKey],
  )

  return (
    <Box
      borderColor={isFocused ? theme.accent : "white"}
      borderStyle="single"
      flexDirection="column"
      width="100%"
      {...props}
      paddingX={1}
    >
      <Tabs
        jumpModeEnabled={jumpModeEnabled}
        onChange={setActiveTab}
        tabs={Object.values(TABS).reverse()}
        value={activeTab}
      />
      {activeTab.value === TABS.VARIABLES.value && <VariablesEditor focus={isFocused} />}
      {activeTab.value === TABS.HEADERS.value && <HeadersEditor focus={isFocused} />}
    </Box>
  )
}
