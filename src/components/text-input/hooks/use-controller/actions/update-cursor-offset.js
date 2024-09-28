export default function updateCursorOffset(ctx) {
  const { cursorOffset, cursorOffsetRef } = ctx
  cursorOffsetRef.current = cursorOffset
  return ctx
}
