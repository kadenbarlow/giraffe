export default function handleKeypress(ctx) {
  const { cursorOffset, focus, key } = ctx
  if (focus) {
    if (key.leftArrow) {
      return {
        ...ctx,
        cursorOffset: {
          ...cursorOffset,
          formattedXOffset: cursorOffset.formattedXOffset - 1,
          unformattedXOffset: cursorOffset.unformattedXOffset - 1,
        },
      }
    } else if (key.rightArrow) {
      return {
        ...ctx,
        cursorOffset: {
          ...cursorOffset,
          formattedXOffset: cursorOffset.formattedXOffset + 1,
          unformattedXOffset: cursorOffset.unformattedXOffset + 1,
        },
      }
    }
  }
  return ctx
}
