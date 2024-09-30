import chalk from "chalk"
import { Box, Text } from "ink"
import React from "react"
import useConfig from "#hooks/use-config.js"

export default function Tabs({ jumpModeEnabled, tabs, value: activeTab, ...props }) {
  const { theme } = useConfig()

  return (
    <Box flexDirection="column" width="100%">
      <Box flexDirection="row" width="100%" {...props}>
        {tabs.map((tab) => (
          <Box height={1} key={tab.value} paddingRight={1}>
            <Text
              color={activeTab.value === tab.value ? theme.accent : "white"}
              underline={activeTab.value === tab.value}
            >
              {jumpModeEnabled ? chalk.inverse(chalk.hex(theme.accent)(tab.jumpKey)) + tab.value.slice(1) : tab.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
