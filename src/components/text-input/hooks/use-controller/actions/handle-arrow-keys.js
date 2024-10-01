export default function handleKeypress(ctx) {
  const { cursorOffset, focus, key, value } = ctx
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
    } else if (key.downArrow) {
      const currentLineIndex = cursorOffset.x - value.lastIndexOf("\n", cursorOffset.x)
      const nextNewLine = value.indexOf("\n", cursorOffset.x)
      const endOfNextLine = value.indexOf("\n", nextNewLine + 1)
      const nextIndex = Math.min(endOfNextLine, currentLineIndex + nextNewLine)

      return {
        ...ctx,
        cursorOffset: {
          ...cursorOffset,
          x: nextIndex === -1 || nextNewLine === -1 ? value.length : nextIndex,
        },
      }
    } else if (key.upArrow) {
      const currentLineIndex = cursorOffset.x - value.lastIndexOf("\n", cursorOffset.x)
      const lastNewLine = value.lastIndexOf("\n", cursorOffset.x)
      const beginningOfLastLine = value.lastIndexOf("\n", lastNewLine - 1)
      const nextIndex = Math.min(lastNewLine, currentLineIndex + beginningOfLastLine)

      return {
        ...ctx,
        cursorOffset: {
          ...cursorOffset,
          x: Math.max(nextIndex, 0),
        },
      }
    }
  }
  return ctx
}
