import chalk from "chalk"
import { Box, Text } from "ink"
import React from "react"
import pSBC from "#lib/pSBC.js"
import useConfig from "#stores/use-config/index.js"

export default function Tabs({ jumpModeEnabled, tabs, value: activeTab, ...props }) {
  const theme = useConfig((config) => config.theme)

  return (
    <Box flexDirection="column" width="100%">
      <Box flexDirection="row" width="100%" {...props}>
        {tabs.map((tab) => (
          <Box height={1} key={tab.value} paddingRight={2}>
            <Text
              color={activeTab.value === tab.value ? theme.tab : pSBC(-0.7, theme.tab)}
              underline={activeTab.value === tab.value}
            >
              {jumpModeEnabled ? chalk.inverse(chalk.hex(theme.tabKey)(tab.jumpKey)) + tab.value.slice(1) : tab.value}
            </Text>
          </Box>
        ))}
      </Box>
    </Box>
  )
}
