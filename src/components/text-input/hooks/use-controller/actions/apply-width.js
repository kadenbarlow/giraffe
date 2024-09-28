export default function applyWidth(ctx) {
  const { focus, formattedValue, width } = ctx
  if (width) {
    if (formattedValue.length < width) {
      return { ...ctx, formattedValue: formattedValue + " ".repeat(width - formattedValue.length + (focus ? 9 : 0)) }
    }
  }
  return ctx
}
