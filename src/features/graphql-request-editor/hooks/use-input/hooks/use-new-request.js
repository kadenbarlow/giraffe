import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function useNewRequest() {
  const setRequest = useRequestStore((state) => state.setRequest)

  const newRequest = async () => {
    setRequest({
      headers: "{}",
      query: "",
      url: "",
      variables: "{}",
    })
  }

  return { newRequest }
}
