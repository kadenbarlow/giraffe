export default function updateCursorOffset(ctx) {
  const { cursorOffset, cursorOffsetRef } = ctx
  debugger
  cursorOffsetRef.current = cursorOffset
  return ctx
}
