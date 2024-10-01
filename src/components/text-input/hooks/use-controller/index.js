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
} from "./actions/index.js"

export default function useController(props) {
  const { disabled, focus, multiline, onChange, scrollHeight, syntax, syntaxTheme, value, width, ...inkProps } = props

  const cursorOffset = useRef({ x: 0 })
  const [formattedValue, setFormattedValue] = useState(value)

  useInput(
    (input, key) =>
      pipe.sync(
        handleDeletions,
        handleInsertions,
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
        value,
        width,
      }),
    { isActive: focus && !disabled },
  )

  useEffect(() => {
    pipe.sync(
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
      onChange,
      setFormattedValue,
      syntax,
      syntaxTheme,
      value,
      width,
    })
  }, [focus, onChange, syntax, syntaxTheme, value, width])

  return {
    formattedValue,
    inkProps,
    isFocused: focus,
    scrollHeight,
  }
}
