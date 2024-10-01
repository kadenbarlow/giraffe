import { Box, useFocus } from "ink"
import React, { useEffect, useState } from "react"
import Tabs from "#components/tabs/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import useConfig from "#hooks/use-config.js"
import Collections from "./components/collections/index.js"
import Response from "./components/response/index.js"
import Schema from "./components/schema/index.js"

const TABS = {
  RESPONSE: {
    jumpKey: "R",
    value: "Response",
  },
  SCHEMA: {
    jumpKey: "S",
    value: "Schema",
  },
  STORED_COLLECTIONS: {
    jumpKey: "C",
    value: "Collections",
  },
}

export default function RightPanel({ ...props }) {
  const { isFocused } = useFocus({ id: "right-panel" })
  const { theme } = useConfig()
  const [activeTab, setActiveTab] = useState(TABS.RESPONSE)
  const jumpModeEnabled = useRequestStore((state) => state.jumpModeEnabled)
  const jumpKey = useRequestStore((state) => state.jumpKey)
  const setJumpKey = useRequestStore((state) => state.setJumpKey)

  useEffect(
    function selectTabOnJump() {
      function setTab(tab) {
        setActiveTab(tab)
        setJumpKey(null)
      }

      if (jumpKey === "r") setTab(TABS.RESPONSE)
      if (jumpKey === "s") setTab(TABS.SCHEMA)
      if (jumpKey === "c") setTab(TABS.STORED_COLLECTIONS)
    },
    [jumpKey, setJumpKey],
  )

  return (
    <Box
      borderColor={isFocused ? theme.accent : "white"}
      borderStyle="single"
      flexDirection="column"
      height="100%"
      paddingX={1}
      width="100%"
      {...props}
    >
      <Tabs jumpModeEnabled={jumpModeEnabled} tabs={Object.values(TABS)} value={activeTab} />
      {activeTab.value === TABS.RESPONSE.value && <Response focus={isFocused} />}
      {activeTab.value === TABS.SCHEMA.value && <Schema focus={isFocused} />}
      {activeTab.value === TABS.STORED_COLLECTIONS.value && <Collections focus={isFocused} />}
    </Box>
  )
}
