export default function updateCursorOffset(ctx) {
  const { cursorOffset, setCursorOffset } = ctx
  setCursorOffset(cursorOffset)
  return ctx
}
