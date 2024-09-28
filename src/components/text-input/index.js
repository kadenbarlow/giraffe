import { Text } from "ink"
import React from "react"
import useController from "./hooks/use-controller/index.js"

export default function TextInput(props) {
  const { formattedValue, inkProps } = useController(props)

  return <Text {...inkProps}>{formattedValue}</Text>
}
