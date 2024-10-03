import openContentInEditor from "#lib/open-content-in-editor/index.js"

export default async function handleOpenInEditor(ctx) {
  const { disabled, input, key, syntax, value } = ctx

  if (key.ctrl && input === "b") {
    const newValue = await openContentInEditor({ content: value, fileType: syntax })
    return { ...ctx, value: disabled ? `${value} ` : newValue }
  }
  return ctx
}
