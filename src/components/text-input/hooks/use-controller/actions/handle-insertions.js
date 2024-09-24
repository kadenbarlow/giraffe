const FUNCTION_KEYS = [
  "leftArrow",
  "rightArrow",
  "upArrow",
  "downArrow",
  "return",
  "escape",
  "ctrl",
  "shift",
  "tab",
  "backspace",
  "delete",
  "pageDown",
  "pageUp",
  "meta",
]

export default function handleInsertions(ctx) {
  const { cursorOffset, displayValue, focus, input, key } = ctx
  if (focus && input && FUNCTION_KEYS.every((pressed) => !key[pressed])) {
    return {
      ...ctx,
      cursorOffset: cursorOffset + 1,
      displayValue: displayValue.slice(0, cursorOffset) + input + displayValue.slice(cursorOffset),
    }
  }
  return ctx
}
