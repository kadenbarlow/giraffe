import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function useSendRequest() {
  const setResponse = useRequestStore((state) => state.setResponse)
  const setToast = useRequestStore((state) => state.setToast)

  const sendRequest = async () => {
    const { headers, query, url, variables } = useRequestStore.getState()
    try {
      setToast({ message: "Requesting...", type: "primary" })
      const response = await fetch(url, {
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
      const json = await response.json()
      setResponse(JSON.stringify(json, null, 2))
    } catch (error) {
      setResponse(error.message)
    }
  }

  return { sendRequest }
}
