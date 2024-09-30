import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function useController() {
  const setResponse = useRequestStore((state) => state.setResponse)

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

  return { sendRequest }
}
