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
  const { cursorOffset, disabled, focus, input, key, multiline, value } = ctx

  const content = NEWLINE_CHARACTERS.includes(input) ? "\n" : input

  if (!focus || disabled) return ctx
  if (content === "\n" && !key.return) return ctx
  if (content === "\n" && !multiline) return ctx
  if (FUNCTION_KEYS.some((pressed) => key[pressed])) return ctx

  return {
    ...ctx,
    cursorOffset: {
      ...cursorOffset,
      x: cursorOffset.x + input.length,
    },
    value: value.slice(0, cursorOffset.x) + content + value.slice(cursorOffset.x),
  }
}
