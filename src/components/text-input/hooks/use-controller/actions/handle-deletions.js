export default function handleInsertions(ctx) {
  const { cursorOffset, focus, key, value } = ctx

  if (!focus) return ctx
  if (!key.backspace && !key.delete) return ctx

  return {
    ...ctx,
    cursorOffset: {
      ...cursorOffset,
      x: cursorOffset.x - 1,
    },
    value: value.substring(0, cursorOffset.x - 1) + value.substring(cursorOffset.x),
  }
}
