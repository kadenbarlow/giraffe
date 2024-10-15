import clipboard from "clipboardy"

export default function handleCopy(ctx) {
  const { input, key, value } = ctx

  const meta = key.ctrl || key.meta
  if (meta && input === "y") {
    clipboard.write(value)
  }
  return ctx
}
