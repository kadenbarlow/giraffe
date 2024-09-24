export default function handleKeypress(ctx) {
  const { cursorOffset, focus, key } = ctx
  if (focus) {
    if (key.leftArrow) {
      return {
        ...ctx,
        cursorOffset: cursorOffset - 1,
      }
    } else if (key.rightArrow) {
      return {
        ...ctx,
        cursorOffset: cursorOffset + 1,
      }
    }
  }
  return ctx
}
