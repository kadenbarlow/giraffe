import useRequestStore from "#stores/use-request-store.js"

export default function useController(props) {
  const setResponse = useRequestStore((state) => state.setResponse)

  return {
    actions: {
      sendRequest: async () => {
        const request = useRequestStore.getState()
        try {
          const response = await fetch(request.url, {
            body: JSON.stringify({
              query: request.query,
              variables: JSON.parse(request.variables || "{}"),
            }),
            headers: {
              "Content-Type": "application/json",
              ...request.headers,
            },
            method: "POST",
          })
          setResponse(await response.json())
        } catch (error) {
          debugger
        }
      },
    },
  }
}
