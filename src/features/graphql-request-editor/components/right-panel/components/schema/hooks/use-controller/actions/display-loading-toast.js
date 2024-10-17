import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function displayLoadingToast(ctx) {
  useRequestStore.getState().setToast({
    message: "Fetching schema...",
    type: "info",
  })
  return ctx
}
