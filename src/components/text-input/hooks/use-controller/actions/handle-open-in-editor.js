import openContentInEditor from "#lib/open-content-in-editor/index.js"

export default async function handleOpenInEditor(ctx) {
  const { disabled, input, key, syntax, value } = ctx

  const meta = key.ctrl || key.meta
  if (meta && input === "o") {
    const newValue = await openContentInEditor({ content: value, fileType: syntax })
    return { ...ctx, value: disabled ? `${value} ` : newValue }
  }
  return ctx
}
