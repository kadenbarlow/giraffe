import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function newRequest() {
  const { setRequest } = useRequestStore.getState()

  setRequest({
    filePath: "",
    headers: "{}",
    info: JSON.stringify({ description: "", filePath: "new-request.json", name: "" }, null, 2),
    query: "",
    url: "",
    variables: "{}",
  })
}
