import { useInput } from "ink"
import { useEffect, useRef, useState } from "react"
import pipe from "#lib/pipe/index.js"
import applyCursor from "./actions/apply-cursor.js"
import applySyntaxHighlighting from "./actions/apply-syntax-highlighting.js"
import applyWidth from "./actions/apply-width.js"
import handleArrowKeys from "./actions/handle-arrow-keys.js"
import handleInsertions from "./actions/handle-insertions.js"
import updateCursorOffset from "./actions/update-cursor-offset.js"
import updateFormattedValue from "./actions/update-formatted-value.js"
import updateUnformattedValue from "./actions/update-unformatted-value.js"

export default function useController(props) {
  const { focus, multiline, syntax, syntaxTheme, value, width, ...inkProps } = props

  const cursorOffset = useRef({ x: 0, y: 0 })
  const unformattedValue = useRef(value)
  const [formattedValue, setFormattedValue] = useState(value)

  // TODO: Handle text wrapping
  // handle cursors across multilines
  // handle up and down arrows
  // handle backspaces
  // handle copy and paste (where input > a single character)
  useInput(
    (input, key) =>
      pipe.sync(
        handleInsertions,
        updateUnformattedValue,
        handleArrowKeys,
        updateCursorOffset,
        applyCursor,
        applyWidth,
        applySyntaxHighlighting,
        updateFormattedValue,
      )({
        cursorOffset: cursorOffset.current,
        cursorOffsetRef: cursorOffset,
        focus,
        formattedValue: null,
        input,
        key,
        multiline,
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
