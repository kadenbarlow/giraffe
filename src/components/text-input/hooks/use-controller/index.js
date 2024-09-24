import { useInput } from "ink"
import { useEffect, useRef, useState } from "react"
import applyCursor from "./actions/apply-cursor.js"
import applySyntaxHighlighting from "./actions/apply-syntax-highlighting.js"
import applyWidth from "./actions/apply-width.js"
import handleArrowKeys from "./actions/handle-arrow-keys.js"
import handleInsertions from "./actions/handle-insertions.js"
import updateCursorOffset from "./actions/update-cursor-offset.js"
import updateFormattedValue from "./actions/update-formatted-value.js"
import updateUnformattedValue from "./actions/update-unformatted-value.js"

const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x)

export default function useController(props) {
  const { focus, syntax, syntaxTheme, value, width, ...inkProps } = props

  const cursorOffset = useRef({
    formattedXOffset: 0,
    formattedYOffset: 0,
    unformattedXOffset: 0,
    unformattedYOffset: 0,
  })
  const unformattedValue = useRef(value)
  const [formattedValue, setFormattedValue] = useState(value)

  useInput(
    (input, key) =>
      pipe(
        handleInsertions,
        handleArrowKeys,
        applyWidth,
        applySyntaxHighlighting,
        applyCursor,
        updateUnformattedValue,
        updateFormattedValue,
        updateCursorOffset,
      )({
        cursorOffset: cursorOffset.current,
        cursorOffsetRef: cursorOffset,
        focus,
        formattedValue: null,
        input,
        key,
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
      pipe(
        applyWidth,
        applySyntaxHighlighting,
        applyCursor,
        updateUnformattedValue,
        updateFormattedValue,
        updateCursorOffset,
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
