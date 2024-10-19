import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function displayLoadingToast(ctx) {
  useRequestStore.getState().setToast({
    message: "Sending request...",
    type: "info",
  })
  return ctx
}
