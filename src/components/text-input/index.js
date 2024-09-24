import chalk from "chalk"
import { Text, useInput } from "ink"
import React, { useEffect, useState } from "react"
import syntaxHighlight from "#lib/syntax-highlight.js"
import useController from "./hooks/use-controller/index.js"

export default function TextInput(props) {
  const { displayValue, inkProps } = useController(props)

  return <Text {...inkProps}>{displayValue}</Text>
}
