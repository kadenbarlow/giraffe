export default function updateUnformattedValue(ctx) {
  const { unformattedValue, unformattedValueRef } = ctx
  unformattedValueRef.current = unformattedValue
  return ctx
}
