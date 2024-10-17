import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function displayLoadingToast(ctx) {
  useRequestStore.getState().setToast({
    message: "Refreshed schema",
    timeout: 2000,
    type: "success",
  })
  return ctx
}