export default function updateDisplayValue(ctx) {
  const { displayValue, setDisplayValue } = ctx
  setDisplayValue(displayValue)
  return ctx
}
