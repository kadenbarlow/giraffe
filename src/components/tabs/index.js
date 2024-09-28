import { Box, Text } from "ink"
import React from "react"
import useTheme from "#hooks/use-theme.js"

export default function Tabs({ onChange, tabs, value: activeTab, ...props }) {
  const { colors } = useTheme()

  return (
    <Box flexDirection="column" width="100%">
      <Box flexDirection="row" width="100%" {...props}>
        {tabs.map((tab) => (
          <Box height={1} key={tab} paddingRight={1}>
            <Text color={activeTab === tab ? colors.accent : "white"} underline={activeTab === tab}>
              {tab}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
