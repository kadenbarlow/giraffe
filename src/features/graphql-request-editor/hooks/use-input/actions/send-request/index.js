import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import pipe from "#lib/pipe/index.js"
import {
  displayFinalToast,
  displayLoadingToast,
  parseResponse,
  sendGraphqlRequest,
  updateHistory,
} from "./actions/index.js"

export default async function sendRequest() {
  const { headers, query, setResponse, setToast, url, variables } = useRequestStore.getState()

  try {
    return await pipe.async(
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
    if (error.status) {
      setResponse(error.message)
      setToast({ message: `${error.status} ${error.statusText}`, type: "error" })
    } else {
      if (error instanceof TypeError && error.message.includes("fetch failed")) {
        setResponse(`Error: connect ECONNREFUSED ${url}`)
      } else {
        setResponse(error.message)
      }
      setToast({ message: "Request failed", type: "error" })
    }
  }
}
