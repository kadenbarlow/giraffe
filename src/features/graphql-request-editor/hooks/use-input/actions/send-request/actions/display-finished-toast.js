import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function displayFinishedToast(ctx) {
  const { parsedResponse } = ctx

  const message =
    `${parsedResponse.status} ${parsedResponse.statusText} - ` +
    `${parsedResponse.responseTime}ms - ` +
    `${parsedResponse.bodySize} bytes | ${parsedResponse.responseSize} bytes`

  useRequestStore.getState().setToast({
    message,
    type: "success",
  })
  return ctx
}
