export default function handleInsertions(ctx) {
  const { cursorOffset, focus, key, unformattedValue } = ctx

  if (!focus) return ctx
  if (!key.backspace && !key.delete) return ctx

  return {
    ...ctx,
    cursorOffset: {
      ...cursorOffset,
      x: cursorOffset.x - 1,
    },
    unformattedValue: unformattedValue.substring(0, cursorOffset.x - 1) + unformattedValue.substring(cursorOffset.x),
  }
}
