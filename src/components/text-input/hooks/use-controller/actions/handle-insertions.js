const FUNCTION_KEYS = [
  "leftArrow",
  "rightArrow",
  "upArrow",
  "downArrow",
  "escape",
  "ctrl",
  "tab",
  "backspace",
  "delete",
  "pageDown",
  "pageUp",
  "meta",
]

export default function handleInsertions(ctx) {
  const { cursorOffset, focus, input, key, multiline, unformattedValue } = ctx

  if (!focus) return ctx
  if (key.return && !multiline) return ctx
  if (FUNCTION_KEYS.some((pressed) => key[pressed])) return ctx

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
