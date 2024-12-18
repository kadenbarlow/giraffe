import useRequestStore from "#features/graphql-request-editor/stores/use-request-store.js"

export default function selectOption(option) {
  const setRequest = useRequestStore.getState().setRequest
  setRequest({
    query: option.loc.source.body
      .slice(option.loc.start, option.loc.end)
      .replace(/query (.*?)_query/, "query $1")
      .replace(/mutation (.*)_mutation/, "mutation $1")
      .replace(/subscription (.*)_subscription/, "subscription $1"),
    variables: JSON.stringify(option.variables, null, 2),
  })
}
