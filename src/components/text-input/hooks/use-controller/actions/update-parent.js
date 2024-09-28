export default function callOnChange(ctx) {
  const { onChange, unformattedValue } = ctx
  onChange(unformattedValue)
  return ctx
}
