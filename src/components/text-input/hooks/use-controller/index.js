import { useInput } from "ink"
import { useEffect, useState } from "react"
import applyCursor from "./actions/apply-cursor.js"
import applySyntaxHighlighting from "./actions/apply-syntax-highlighting.js"
import applyWidth from "./actions/apply-width.js"
import handleArrowKeys from "./actions/handle-arrow-keys.js"
import handleInsertions from "./actions/handle-insertions.js"
import updateCursorOffset from "./actions/update-cursor-offset.js"
import updateDisplayValue from "./actions/update-display-value.js"

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x)

export default function useController(props) {
  const { focus, multiline, onChange, placeholder, placeholderColor, syntax, syntaxTheme, value, width, ...inkProps } =
    props

  const [cursorOffset, setCursorOffset] = useState(0)
  const [displayValue, setDisplayValue] = useState(value)

  useInput((input, key) =>
    pipe(
      applyWidth,
      applySyntaxHighlighting,
      handleArrowKeys,
      handleInsertions,
      applyCursor,
      updateDisplayValue,
      updateCursorOffset,
    )({
      cursorOffset,
      displayValue: null,
      focus,
      input,
      key,
      originalValue: value,
      setCursorOffset,
      setDisplayValue,
      syntax,
      syntaxTheme,
      width,
    }),
  )

  useEffect(
    function initialize() {
      pipe(
        applyWidth,
        applySyntaxHighlighting,
        applyCursor,
        updateDisplayValue,
        updateCursorOffset,
      )({
        cursorOffset,
        displayValue: null,
        focus,
        originalValue: value,
        setCursorOffset,
        setDisplayValue,
        syntax,
        syntaxTheme,
        width,
      })
    },
    [cursorOffset, displayValue, focus, syntax, syntaxTheme, value, width],
  )

  return {
    displayValue,
    inkProps,
  }
}
