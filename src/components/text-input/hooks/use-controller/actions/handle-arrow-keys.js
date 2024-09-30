export default function handleKeypress(ctx) {
  const { cursorOffset, focus, key } = ctx
  if (focus) {
    if (key.leftArrow && cursorOffset.x > 0) {
      return {
        ...ctx,
        cursorOffset: {
          ...cursorOffset,
          x: cursorOffset.x - 1,
        },
      }
    } else if (key.rightArrow && cursorOffset.x < ctx.value.length) {
      return {
        ...ctx,
        cursorOffset: {
          ...cursorOffset,
          x: cursorOffset.x + 1,
        },
      }
    }
  }
  return ctx
}
