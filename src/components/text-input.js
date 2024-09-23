import chalk from "chalk"
import { Text, useInput } from "ink"
import React, { useEffect, useState } from "react"

// Pulled from https://github.com/vadimdemedes/ink-text-input
export default function TextInput({
  focus = true,
  highlightPastedText = false,
  mask,
  onChange,
  placeholder = "",
  placeholderColor = "#FFFFFF",
  showCursor = true,
  value: originalValue,
  width = 0,
  ...props
}) {
  const [state, setState] = useState({
    cursorOffset: (originalValue || "").length,
    cursorWidth: 0,
  })
  const { cursorOffset, cursorWidth } = state

  useEffect(() => {
    setState((previousState) => {
      if (!focus || !showCursor) {
        return previousState
      }
      const newValue = originalValue || ""
      if (previousState.cursorOffset > newValue.length - 1) {
        return {
          cursorOffset: newValue.length,
          cursorWidth: 0,
        }
      }
      return previousState
    })
  }, [originalValue, focus, showCursor])

  const cursorActualWidth = highlightPastedText ? cursorWidth : 0
  const value = mask ? mask.repeat(originalValue.length) : originalValue
  let renderedValue = value
  let renderedPlaceholder = placeholder ? chalk.hex(placeholderColor)(placeholder) : undefined
  // Fake mouse cursor, because it's too inconvenient to deal with actual cursor and ansi escapes
  if (showCursor && focus) {
    renderedPlaceholder =
      placeholder.length > 0
        ? chalk.inverse(placeholder[0]) + chalk.hex(placeholderColor)(placeholder.slice(1))
        : chalk.inverse(" ")
    renderedValue = value.length > 0 ? "" : chalk.inverse(" ")
    let i = 0
    for (const char of value) {
      renderedValue += i >= cursorOffset - cursorActualWidth && i <= cursorOffset ? chalk.inverse(char) : char
      i++
    }
    if (value.length > 0 && cursorOffset === value.length) {
      renderedValue += chalk.inverse(" ")
    }
  }

  useInput(
    (input, key) => {
      if (key.return) input = "\n"
      if (key.upArrow || key.downArrow || (key.ctrl && input === "c") || key.tab || (key.shift && key.tab)) {
        return
      }
      let nextCursorOffset = cursorOffset
      let nextValue = originalValue
      let nextCursorWidth = 0
      if (key.leftArrow) {
        if (showCursor) {
          nextCursorOffset--
        }
      } else if (key.rightArrow) {
        if (showCursor) {
          nextCursorOffset++
        }
      } else if (key.backspace || key.delete) {
        if (cursorOffset > 0) {
          nextValue = originalValue.slice(0, cursorOffset - 1) + originalValue.slice(cursorOffset, originalValue.length)
          nextCursorOffset--
        }
      } else {
        nextValue =
          originalValue.slice(0, cursorOffset) + input + originalValue.slice(cursorOffset, originalValue.length)
        nextCursorOffset += input.length
        if (input.length > 1) {
          nextCursorWidth = input.length
        }
      }
      if (cursorOffset < 0) {
        nextCursorOffset = 0
      }
      if (cursorOffset > originalValue.length) {
        nextCursorOffset = originalValue.length
      }
      setState({
        cursorOffset: nextCursorOffset,
        cursorWidth: nextCursorWidth,
      })
      if (nextValue !== originalValue) {
        onChange(nextValue)
      }
    },
    { isActive: focus },
  )

  let renderedText = placeholder ? (value.length > 0 ? renderedValue : renderedPlaceholder) : renderedValue
  if (width !== 0) {
    const renderedValueLength = focus && showCursor ? renderedText.length : renderedText.length + 9
    const length = placeholder ? (value.length > 0 ? renderedValueLength : placeholder.length + 9) : renderedValueLength
    renderedText += " ".repeat(width > length ? width - length : 0)
  }

  return <Text {...props}>{renderedText}</Text>
}
