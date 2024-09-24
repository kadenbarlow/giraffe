export default function applyWidth(ctx) {
  const { originalValue, width } = ctx
  if (width) {
    if (originalValue.length < width) {
      return { ...ctx, displayValue: originalValue + " ".repeat(width - originalValue.length) }
    }
  }
  return { ...ctx, displayValue: originalValue }
}
