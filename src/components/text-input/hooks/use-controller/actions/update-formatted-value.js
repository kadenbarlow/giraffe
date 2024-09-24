export default function updateDisplayValue(ctx) {
  const { formattedValue, setFormattedValue } = ctx
  setFormattedValue(formattedValue)
  return ctx
}
