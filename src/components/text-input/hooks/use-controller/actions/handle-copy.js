import clipboard from "clipboardy"

export default function handleCopy(ctx) {
  const { input, key, value } = ctx
  if (key.ctrl && input === "y") {
    clipboard.write(value)
  }
  return ctx
}
