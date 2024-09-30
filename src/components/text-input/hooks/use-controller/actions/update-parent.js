export default function callOnChange(ctx) {
  const { onChange, value } = ctx
  onChange(value)
  return ctx
}
