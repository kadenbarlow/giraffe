import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"
import safelyParseJson from "#lib/safely-parse-json.js"

export default function useController() {
  const setResponse = useRequestStore((state) => state.setResponse)
  const setVariables = useRequestStore((state) => state.setVariables)
  const setHeaders = useRequestStore((state) => state.setHeaders)

  const formatJsonValues = () => {
    const { headers, variables } = useRequestStore.getState()
    const formattedHeaders = safelyParseJson(headers)
    const formattedVariables = safelyParseJson(variables)
    if (formattedHeaders) setHeaders(JSON.stringify(JSON.parse(headers), null, 2))
    if (formattedVariables) setVariables(JSON.stringify(JSON.parse(variables), null, 2))
  }

  const sendRequest = async () => {
    const { headers, query, url, variables } = useRequestStore.getState()
    return fetch(url, {
      body: JSON.stringify({
        query,
        variables: variables ? JSON.parse(variables) : {},
      }),
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      method: "POST",
    })
      .then((response) => setResponse(response.json()))
      .catch((error) => setResponse(error.message))
  }

  return {
    actions: {
      formatJsonValues,
      sendRequest,
    },
  }
}
