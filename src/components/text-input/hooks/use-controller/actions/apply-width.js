export default function applyWidth(ctx) {
  const { unformattedValue, width } = ctx
  if (width) {
    if (unformattedValue.length < width) {
      return { ...ctx, formattedValue: unformattedValue + " ".repeat(width - unformattedValue.length) }
    }
  }
  return { ...ctx, formattedValue: unformattedValue }
}
