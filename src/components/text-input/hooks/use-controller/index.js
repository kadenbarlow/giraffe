import { useInput } from "ink"
import { useEffect, useRef, useState } from "react"
import pipe from "#lib/pipe/index.js"
import {
  applyCursor,
  applySyntaxHighlighting,
  applyWidth,
  handleArrowKeys,
  handleDeletions,
  handleInsertions,
  updateCursorOffset,
  updateFormattedValue,
  updateParent,
  updateUnformattedValue,
} from "./actions/index.js"

export default function useController(props) {
  const { focus, multiline, onChange, syntax, syntaxTheme, value, width, ...inkProps } = props

  const cursorOffset = useRef({ x: 0 })
  const unformattedValue = useRef(value)
  const [formattedValue, setFormattedValue] = useState(value)

  useInput(
    (input, key) =>
      pipe.sync(
        handleDeletions,
        handleInsertions,
        updateUnformattedValue,
        handleArrowKeys,
        updateCursorOffset,
        applyCursor,
        applyWidth,
        applySyntaxHighlighting,
        updateFormattedValue,
        updateParent,
      )({
        cursorOffset: cursorOffset.current,
        cursorOffsetRef: cursorOffset,
        focus,
        formattedValue: null,
        input,
        key,
        multiline,
        onChange,
        setFormattedValue,
        syntax,
        syntaxTheme,
        unformattedValue: unformattedValue.current,
        unformattedValueRef: unformattedValue,
        width,
      }),
    { isActive: focus },
  )

  useEffect(
    function initialize() {
      pipe.sync(
        applyCursor,
        applyWidth,
        applySyntaxHighlighting,
        updateFormattedValue,
      )({
        cursorOffset: cursorOffset.current,
        cursorOffsetRef: cursorOffset,
        focus,
        formattedValue: null,
        setFormattedValue,
        syntax,
        syntaxTheme,
        unformattedValue: unformattedValue.current,
        unformattedValueRef: unformattedValue,
        width,
      })
    },
    [focus, syntax, syntaxTheme, value, width],
  )

  return {
    formattedValue,
    inkProps,
  }
}
