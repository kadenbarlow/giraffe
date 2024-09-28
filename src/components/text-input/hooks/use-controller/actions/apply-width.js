export default function applyWidth(ctx) {
  const { formattedValue, width } = ctx
  if (width) {
    if (formattedValue.length < width) {
      return { ...ctx, formattedValue: formattedValue + " ".repeat(width - formattedValue.length) }
    }
  }
  return ctx
}
