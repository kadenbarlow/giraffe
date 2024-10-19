import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import pipe from "#lib/pipe/index.js"
import {
  displayFinalToast,
  displayLoadingToast,
  parseResponse,
  sendGraphqlRequest,
  updateHistory,
} from "./actions/index.js"

export default function sendRequest() {
  const { headers, query, setResponse, setToast, url, variables } = useRequestStore.getState()

  try {
    return pipe.async(
      displayLoadingToast,
      sendGraphqlRequest,
      parseResponse,
      updateHistory,
      displayFinalToast,
      ({ parsedResponse }) => setResponse(JSON.stringify(parsedResponse.json, null, 2)),
    )({
      headers,
      parsedResponse: {
        bodySize: null,
        headers: {},
        json: {},
        responseSize: null,
        responseTime: null,
        status: null,
        statusText: "",
      },
      query,
      response: null,
      startTime: new Date(),
      url,
      variables,
    })
  } catch (error) {
    setResponse(error.message)
    if (error.status) {
      setToast({ message: `${error.status} ${error.statusText}`, type: "error" })
    } else {
      setToast({ message: "Request failed", type: "error" })
    }
  }
}
