import { Box, useFocus } from "ink"
import React, { useEffect, useState } from "react"
import Tabs from "#components/tabs/index.js"
import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import pSBC from "#lib/pSBC.js"
import useConfig from "#stores/use-config/index.js"
import { Collections, Generate, History, Response, Schema } from "./components/index.js"

const TABS = {
  COLLECTIONS: {
    jumpKey: "C",
    value: "Collections",
  },
  GENERATE: {
    jumpKey: "G",
    value: "Generate",
  },
  HISTORY: {
    jumpKey: "P",
    value: "History",
  },
  RESPONSE: {
    jumpKey: "R",
    value: "Response",
  },
  SCHEMA: {
    jumpKey: "S",
    value: "Schema",
  },
}

export default function RightPanel({ ...props }) {
  const { isFocused } = useFocus({ id: "right-panel" })
  const theme = useConfig((config) => config.theme)
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

      if (jumpKey === TABS.RESPONSE.jumpKey.toLowerCase()) setTab(TABS.RESPONSE)
      else if (jumpKey === TABS.SCHEMA.jumpKey.toLowerCase()) setTab(TABS.SCHEMA)
      else if (jumpKey === TABS.COLLECTIONS.jumpKey.toLowerCase()) setTab(TABS.COLLECTIONS)
      else if (jumpKey === TABS.HISTORY.jumpKey.toLowerCase()) setTab(TABS.HISTORY)
      else if (jumpKey === TABS.GENERATE.jumpKey.toLowerCase()) setTab(TABS.GENERATE)
    },
    [jumpKey, setJumpKey],
  )

  return (
    <Box
      borderColor={isFocused ? theme.boxBorder : pSBC(-0.7, theme.boxBorder)}
      borderStyle={isFocused ? "bold" : "round"}
      flexDirection="column"
      height="100%"
      paddingX={1}
      width="100%"
      {...props}
    >
      <Tabs
        jumpModeEnabled={jumpModeEnabled}
        tabs={[TABS.RESPONSE, TABS.SCHEMA, TABS.COLLECTIONS, TABS.HISTORY, TABS.GENERATE]}
        value={activeTab}
      />

      {activeTab.value === TABS.RESPONSE.value && <Response focus={isFocused} />}
      {activeTab.value === TABS.SCHEMA.value && <Schema focus={isFocused} />}
      {activeTab.value === TABS.COLLECTIONS.value && <Collections focus={isFocused} />}
      {activeTab.value === TABS.HISTORY.value && <History focus={isFocused} />}
      {activeTab.value === TABS.GENERATE.value && <Generate focus={isFocused} />}
    </Box>
  )
}
