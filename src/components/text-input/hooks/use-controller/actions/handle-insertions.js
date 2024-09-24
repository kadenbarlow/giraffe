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
  const { cursorOffset, focus, input, key, unformattedValue } = ctx
  if (focus && input && FUNCTION_KEYS.every((pressed) => !key[pressed])) {
    return {
      ...ctx,
      cursorOffset: {
        ...cursorOffset,
        unformattedXOffset: cursorOffset.unformattedXOffset + 1,
      },
      insertion: true,
      unformattedValue:
        unformattedValue.slice(0, cursorOffset.unformattedXOffset) +
        input +
        unformattedValue.slice(cursorOffset.unformattedXOffset),
    }
  }
  return ctx
}
