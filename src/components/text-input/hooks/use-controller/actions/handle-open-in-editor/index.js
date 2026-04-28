import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import { openContentInEditor } from "./actions/index.js"

export default async function handleOpenInEditor(ctx) {
  const { disabled, input, key, syntax, value } = ctx

  const meta = key.ctrl || key.meta
  if (meta && input === "o") {
    const newValue = await openContentInEditor({ content: value, fileType: syntax })
    useRequestStore.getState().setEditorSession()

    return {
      ...ctx,
      value: disabled ? value : newValue,
    }
  }

  return ctx
}
