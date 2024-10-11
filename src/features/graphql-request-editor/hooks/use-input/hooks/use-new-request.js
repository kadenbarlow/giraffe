import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function useNewRequest() {
  const setRequest = useRequestStore((state) => state.setRequest)

  const newRequest = async () => {
    setRequest({
      filePath: "",
      headers: "{}",
      info: JSON.stringify({ description: "", filePath: "new-request.json", name: "" }, null, 2),
      query: "",
      url: "",
      variables: "{}",
    })
  }

  return { newRequest }
}
