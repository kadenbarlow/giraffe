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

const NEWLINE_CHARACTERS = ["\n", "\r", "\r\n"]

export default function handleInsertions(ctx) {
  const { cursorOffset, focus, input, key, multiline, value } = ctx

  if (!focus) return ctx
  if (key.return && !multiline) return ctx
  if (FUNCTION_KEYS.some((pressed) => key[pressed])) return ctx

  const content = NEWLINE_CHARACTERS.includes(input) ? "\n" : input

  return {
    ...ctx,
    cursorOffset: {
      ...cursorOffset,
      x: cursorOffset.x + input.length,
    },
    value: value.slice(0, cursorOffset.x) + content + value.slice(cursorOffset.x),
  }
}
